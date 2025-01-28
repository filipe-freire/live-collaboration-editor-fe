import { Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Palette,
  Type,
} from "lucide-react";
import { memo } from "react";
import { ColorPicker } from "../ColorPicker";
import { HIGHLIGHT_COLORS, TEXT_COLORS } from "../constants";
import { FontPicker } from "../FontPicker";
import { useMenuBar } from "./useMenuBar";

interface IMenuBarProps {
  editor: Editor;
}

export const MenuBar = memo(({ editor }: IMenuBarProps) => {
  const {
    activePicker,
    menuRef,
    setColor,
    setFontFamily,
    setHighlight,
    toggleBold,
    toggleBulletList,
    toggleHeading,
    toggleItalic,
    toggleOrderedList,
    togglePicker,
  } = useMenuBar({ editor });

  return (
    <div
      className="flex flex-wrap gap-2 border-b border-gray-200 py-1 pl-2"
      ref={menuRef}
    >
      <button
        onClick={toggleHeading}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={`cursor-pointer rounded p-2 ${
          editor.isActive("heading", { level: 1 })
            ? "bg-gray-200"
            : "hover:bg-gray-100"
        }`}
        title="Heading 1 (Ctrl+Alt+1)"
      >
        <Heading1 className="h-5 w-5" />
      </button>
      <button
        onClick={toggleBold}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`cursor-pointer rounded p-2 ${
          editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
        title="Bold (Ctrl+B)"
      >
        <Bold className="h-5 w-5" />
      </button>
      <button
        onClick={toggleItalic}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`cursor-pointer rounded p-2 ${
          editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
        title="Italic (Ctrl+I)"
      >
        <Italic className="h-5 w-5" />
      </button>
      <button
        onClick={toggleBulletList}
        className={`cursor-pointer rounded p-2 ${
          editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
        title="Bullet List (Ctrl+Shift+8)"
      >
        <List className="h-5 w-5" />
      </button>
      <button
        onClick={toggleOrderedList}
        className={`cursor-pointer rounded p-2 ${
          editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
        title="Ordered List (Ctrl+Shift+7)"
      >
        <ListOrdered className="h-5 w-5" />
      </button>

      <div className="relative">
        <button
          className={`cursor-pointer rounded p-2 ${
            activePicker === "font" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
          onClick={() => togglePicker("font")}
          title="Change Font Family"
        >
          <Type className="h-5 w-5" />
        </button>
        {activePicker === "font" && (
          <FontPicker onFontSelect={setFontFamily} editor={editor} />
        )}
      </div>

      <div className="relative">
        <button
          className={`cursor-pointer rounded p-2 ${
            activePicker === "color" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
          onClick={() => togglePicker("color")}
          title="Change Text Color"
        >
          <Palette className="h-5 w-5" />
        </button>
        {activePicker === "color" && (
          <ColorPicker colors={TEXT_COLORS} onColorSelect={setColor} />
        )}
      </div>

      <div className="relative">
        <button
          className={`cursor-pointer rounded p-2 ${
            activePicker === "highlight" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
          onClick={() => togglePicker("highlight")}
          title="Change Highlight Color"
        >
          <Highlighter className="h-5 w-5" />
        </button>
        {activePicker === "highlight" && (
          <ColorPicker colors={HIGHLIGHT_COLORS} onColorSelect={setHighlight} />
        )}
      </div>
    </div>
  );
});

MenuBar.displayName = "MenuBar";
