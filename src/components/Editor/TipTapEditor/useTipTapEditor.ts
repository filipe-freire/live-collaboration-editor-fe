import { TiptapCollabProvider, WebSocketStatus } from "@hocuspocus/provider";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Color from "@tiptap/extension-color";
import { mergeAttributes, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getRandomColor, getRandomName } from "../../../utils";

import CharacterCount from "@tiptap/extension-character-count";
import FontFamily from "@tiptap/extension-font-family";
import Heading, { Level } from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import * as Y from "yjs";

// Default initial content when the document is created for the first time
const DEFAULT_CONTENT = `
  <p>Hi 👋, this is a collaborative document.</p>
  <p>Feel free to edit and collaborate in real-time!</p>
`;

const getInitialUser = () => ({
  name: getRandomName(),
  color: getRandomColor(),
});

interface IUseTipTapEditorProps {
  provider: TiptapCollabProvider;
  ydoc: Y.Doc;
}

export function useTipTapEditor({ provider, ydoc }: IUseTipTapEditorProps) {
  const [status, setStatus] = useState(WebSocketStatus.Connecting);
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
      // 🦍 in order for tip tap to play nice with tailwind 🔽
      // source: https://github.com/ueberdosis/tiptap/issues/1514#issuecomment-1573752216
      Heading.extend({
        levels: [1, 2],
        renderHTML({ node, HTMLAttributes }) {
          const nodeAttrLevel = node.attrs.level as Level;

          const level = this.options.levels.includes(nodeAttrLevel)
            ? nodeAttrLevel
            : this.options.levels[0];
          const classes: Record<number, string> = {
            1: "text-2xl",
            2: "text-xl",
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
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
    const statusHandler = (event: {
      status: SetStateAction<WebSocketStatus>;
    }) => {
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

  return {
    editor,
    status,
    currentUser,
    setName,
  };
}
