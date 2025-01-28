import { memo } from "react";

export const ColorPicker = memo(
  ({
    colors,
    onColorSelect,
  }: {
    colors: string[];
    onColorSelect: (color: string) => void;
  }) => (
    <div className="absolute right-0 z-10 mt-1 flex w-36 flex-wrap rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          className="m-1 h-8 w-8 rounded-full border border-gray-200"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  ),
);
ColorPicker.displayName = "ColorPicker";
