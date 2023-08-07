import { createContext, PropsWithChildren } from "react";
import { useEditor, Editor, ChainedCommands } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";

interface EditorContextProps {
  editor: Editor | null;
  cainsEditor: () => ChainedCommands | null;
}
export const EditorContext = createContext<EditorContextProps>({
  editor: null,
  cainsEditor: () => null,
});
export const EditorProvider = ({ children }: PropsWithChildren) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
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
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full",
      },
    },
  });
  const cainsEditor = (): ChainedCommands => {
    return editor!.chain().focus();
  };

  const values = {
    editor,

    cainsEditor,
  };

  return (
    <EditorContext.Provider value={values}>{children}</EditorContext.Provider>
  );
};
