import { Editor } from "@tiptap/react";
import { useCallback, useEffect, useRef, useState } from "react";

type PickerType = "color" | "highlight" | "font" | null;

interface IUseMenuBar {
  editor: Editor;
}

export function useMenuBar({ editor }: IUseMenuBar) {
  const [activePicker, setActivePicker] = useState<PickerType>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActivePicker(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleHeading = useCallback(() => {
    editor.chain().focus().toggleHeading({ level: 1 }).run();
  }, [editor]);

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleBulletList = useCallback(() => {
    editor.chain().focus().toggleBulletList().run();
  }, [editor]);

  const toggleOrderedList = useCallback(() => {
    editor.chain().focus().toggleOrderedList().run();
  }, [editor]);

  const setColor = useCallback(
    (color: string) => {
      editor.chain().focus().setColor(color).run();
      setActivePicker(null);
    },
    [editor],
  );

  const setHighlight = useCallback(
    (color: string) => {
      editor.chain().focus().toggleHighlight({ color }).run();
      setActivePicker(null);
    },
    [editor],
  );

  const setFontFamily = useCallback(
    (fontFamily: string) => {
      editor.chain().focus().setFontFamily(fontFamily).run();
      setActivePicker(null);
    },
    [editor],
  );

  const togglePicker = useCallback((pickerType: PickerType) => {
    setActivePicker((current) => (current === pickerType ? null : pickerType));
  }, []);

  return {
    activePicker,
    menuRef,
    toggleHeading,
    toggleBold,
    toggleItalic,
    toggleBulletList,
    toggleOrderedList,
    setColor,
    setHighlight,
    setFontFamily,
    togglePicker,
  };
}
