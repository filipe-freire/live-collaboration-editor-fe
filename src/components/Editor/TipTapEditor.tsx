import { TiptapCollabProvider } from "@hocuspocus/provider";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import * as Y from "yjs";

import CharacterCount from "@tiptap/extension-character-count";
import { getRandomColor, getRandomName } from "../../utils";
import { DEFAULT_CONTENT } from "./constants";
import { MenuBar } from "./MenuBar";
import { User, UserList } from "./UserList";

const getInitialUser = () => ({
  name: getRandomName(),
  color: getRandomColor(),
});

export function TipTapEditor({
  provider,
  ydoc,
}: {
  provider: TiptapCollabProvider;
  ydoc: Y.Doc;
}) {
  const [status, setStatus] = useState("connecting");
  const [currentUser, setCurrentUser] = useState(getInitialUser);

  const editor = useEditor({
    enableContentCheck: true,
    onContentError: ({ disableCollaboration }) => {
      disableCollaboration();
    },
    onCreate: ({ editor: currentEditor }) => {
      provider.on("synced", () => {
        if (currentEditor.isEmpty) {
          currentEditor.commands.setContent(DEFAULT_CONTENT);
        }
      });
    },
    extensions: [
      StarterKit.configure({
        history: false,
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-4",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "mb-2",
          },
        },
      }),
      // in order for tip tap to play nice with tailwind 🔽
      // source: https://github.com/ueberdosis/tiptap/issues/1514#issuecomment-1573752216
      Heading.extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          // TODO: 🚨 improve type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: Record<number, string> = {
            1: "text-2xl",
            2: "text-xl",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              // TODO: 🚨 improve type
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }).configure({ levels: [1, 2] }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      CharacterCount.extend().configure({
        limit: 10_000,
      }),
      Collaboration.extend().configure({
        document: ydoc,
      }),
      CollaborationCursor.extend().configure({
        provider,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  useEffect(() => {
    // Update status changes
    const statusHandler = (event: { status: SetStateAction<string> }) => {
      setStatus(event.status);
    };

    provider.on("status", statusHandler);

    return () => {
      provider.off("status", statusHandler);
    };
  }, [provider]);

  // Save current user to localStorage and emit to editor
  useEffect(() => {
    if (editor && currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      editor.chain().focus().updateUser(currentUser).run();
    }
  }, [editor, currentUser]);

  const setName = useCallback(() => {
    const name = (window.prompt("Name", currentUser.name) ?? "")
      .trim()
      .substring(0, 32);

    if (name) {
      return setCurrentUser({ ...currentUser, name });
    }
  }, [currentUser]);

  if (!editor) {
    return "Loading...";
  }

  // TODO: 🚨 fix type
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const userList: User[] = editor.storage.collaborationCursor.users.filter(
    (u: { name: string; color: string }) => u.name && u.color,
  );

  return (
    <div className="rounded-lg border-2 border-solid p-1 shadow-md">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-600">
            Status: {status} {status === "connected" ? "🟢" : "⏳"}
          </p>
          <UserList users={userList} />
        </div>
        <button
          className="ml-2 cursor-pointer rounded p-1 px-2 text-sm"
          style={{
            backgroundColor: currentUser.color,
          }}
          onClick={setName}
          title="Change Your Name"
        >
          📝 {currentUser.name}
        </button>
      </div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
}
