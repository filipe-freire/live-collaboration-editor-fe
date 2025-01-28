import { Editor } from "@tiptap/react";
import { memo } from "react";

export const FontPicker = memo(
  ({
    fontFamilies,
    onFontSelect,
    editor,
  }: {
    fontFamilies: { name: string; value: string }[];
    onFontSelect: (value: string) => void;
    editor: Editor;
  }) => (
    <div className="absolute z-10 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
      {fontFamilies.map(({ name, value }) => (
        <button
          key={value}
          onClick={() => onFontSelect(value)}
          className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
            editor.isActive("textStyle", { fontFamily: value })
              ? "bg-gray-200"
              : ""
          }`}
          style={{ fontFamily: value }}
        >
          {name}
        </button>
      ))}
    </div>
  ),
);
FontPicker.displayName = "FontPicker";
