import { FC } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
interface EditorProps {}
import Toolbar from "./Toolbar";
const Editor: FC<EditorProps> = (props): JSX.Element => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Type something",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full",
      },
    },
  });
  return (
    <div className="max-w-4xl mx-auto p-3 dark:bg-colors-primary-dark bg-colors-primary transition">
      <Toolbar editor={editor} />
      <div className="h-[1px] w-full bg-colors-secondary-dark dark:bg-colors-secondary-light my-3" />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
