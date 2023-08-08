import { FC } from "react";
import { EditorContent } from "@tiptap/react";

import { useToolbarUtils } from "../../Hooks";
interface EditorProps {}
import Toolbar from "./Toolbar";
import EditLink from "./Link/EditLink";
const Editor: FC<EditorProps> = (): JSX.Element | null => {
  const { editor } = useToolbarUtils();
  if (!editor) return null;
  return (
    <div className="max-w-4xl mx-auto p-3 dark:bg-colors-primary-dark bg-colors-primary transition">
      <Toolbar />
      <div className="h-[1px] w-full bg-colors-secondary-dark dark:bg-colors-secondary-light my-3" />
      <EditLink />
      <EditorContent editor={editor} className="w-full" />
    </div>
  );
};

export default Editor;
