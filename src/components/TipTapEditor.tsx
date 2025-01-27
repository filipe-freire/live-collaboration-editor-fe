import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";

export function TipTapEditor() {
	const editor = useEditor({
		extensions: [Document, Paragraph, Text],
		content: `
      <p>
        This is a basic example of a <em>TipTap</em> editor.
      </p>
      <p>
        Try to write something and see the magic happen!
      </p>
    `,
	});

	return <EditorContent editor={editor} />;
}
