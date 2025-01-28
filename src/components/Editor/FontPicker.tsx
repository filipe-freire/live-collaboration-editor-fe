import { Editor } from "@tiptap/react";
import { memo } from "react";
import { FONT_FAMILIES, FontFamilyValues } from "./constants";

interface IFontPickerProps {
  onFontSelect: (value: FontFamilyValues) => void;
  editor: Editor;
}

export const FontPicker = memo(({ onFontSelect, editor }: IFontPickerProps) => (
  <div className="absolute z-10 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
    {FONT_FAMILIES.map(({ name, value }) => (
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
));
FontPicker.displayName = "FontPicker";
