export const TEXT_COLORS = [
  "#000000",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFA500",
  "#800080",
];

export const HIGHLIGHT_COLORS = [
  "#FFFF00",
  "#00FFFF",
  "#FF69B4",
  "#98FB98",
  "#DDA0DD",
  "#F0E68C",
];

export const FONT_FAMILIES = [
  { name: "Serif", value: "serif" },
  { name: "Sans Serif", value: "sans-serif" },
  { name: "Monospace", value: "monospace" },
] as const;
export type FontFamilyValues = (typeof FONT_FAMILIES)[number]["value"];
