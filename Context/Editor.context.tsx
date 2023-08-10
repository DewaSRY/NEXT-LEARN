import { createContext, PropsWithChildren, useState, useEffect } from "react";
import { useEditor, Editor, getMarkRange, Range } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import TipTapImage from "@tiptap/extension-image";
import Code from "@tiptap/extension-code";
interface EditorContextProps {
  readonly editor: Editor | null;
  placeholder?: string;
}
export const EditorContext = createContext<EditorContextProps>(
  {} as EditorContextProps
);
export const EditorProvider = ({ children }: PropsWithChildren) => {
  const [selectionRange, setSelectionRange] = useState<Range>();

  // const getPlaceHolder=(arg?:string)=>{
  //   if(arg)    return arg
  //   return ""

  // }
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Code.configure({
        HTMLAttributes: {
          class: "prose-code:{utility}",
        },
      }),
      Placeholder.configure({
        placeholder: "Type something",
      }),
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: "mx-auto rounded",
        },
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "mx-auto",
        },
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          "prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full",
      },
    },
  });
  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);
  const values = {
    editor,
  };

  return (
    <EditorContext.Provider value={values}>{children}</EditorContext.Provider>
  );
};
