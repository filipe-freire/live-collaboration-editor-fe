import { TiptapCollabProvider, WebSocketStatus } from "@hocuspocus/provider";
import * as Y from "yjs";

import { EditorContent } from "@tiptap/react";

import { MenuBar } from "../MenuBar/MenuBar";
import { UserList } from "../UserList";
import { useTipTapEditor } from "./useTipTapEditor";

interface ITipTapEditorProps {
  provider: TiptapCollabProvider;
  ydoc: Y.Doc;
}

export function TipTapEditor({ provider, ydoc }: ITipTapEditorProps) {
  const { editor, status, currentUser, setName } = useTipTapEditor({
    provider,
    ydoc,
  });

  if (!editor) {
    return "Loading...";
  }

  return (
    <div className="rounded-lg border-2 border-solid p-1 shadow-md">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-600">
            Status: {status}
            {status === WebSocketStatus.Connected ? "🟢" : "⏳"}
          </p>
          <UserList editor={editor} />
        </div>
        <button
          className="ml-2cursor-pointer rounded p-1 px-2 text-sm"
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
