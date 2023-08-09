import { FC, ChangeEventHandler, useState, useEffect } from "react";
import { EditorContent } from "@tiptap/react";
import SEOForm, { SeoResult } from "./SeoForm";
import { useToolbarUtils } from "../../Hooks";
import ThumbnailSelector from "./ThumbnailSelector";
import ActionButton from "../Common/ActionButton";
interface EditorProps {
  initialValue?: FinalPost;
  onSubmit(post: FinalPost): void;
}
export interface FinalPost extends SeoResult {
  title: string;
  content: string;
  thumbnail?: File | string;
}

import Toolbar from "./Toolbar";
import EditLink from "./Link/EditLink";
const Editor: FC<EditorProps> = ({
  initialValue,
  onSubmit,
}): JSX.Element | null => {
  const { editor } = useToolbarUtils();
  const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
  const [post, setPost] = useState<FinalPost>({
    title: "",
    content: "",
    meta: "",
    tags: "",
    slug: "",
  });
  const updateSeoValue = (result: SeoResult) => setPost({ ...post, ...result });
  const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setPost({ ...post, title: target.value });
  const updateThumbnail = (file: File) => setPost({ ...post, thumbnail: file });
  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({ ...post, content: editor.getHTML() });
  };
  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue });
      editor?.commands.setContent(initialValue.content);
      const { meta, slug, tags } = initialValue;
      setSeoInitialValue({ meta, slug, tags });
    }
  }, [initialValue, editor]);

  if (!editor) return null;

  return (
    <>
      <div className="max-w-4xl mx-auto p-3 dark:bg-colors-primary-dark bg-colors-primary transition">
        {/* Thumbnail Selector and Submit Button */}
        <div className="sticky top-0 z-10 dark:bg-colors-primary-dark bg-colors-primary">
          <div className="flex items-center justify-between mb-3">
            <ThumbnailSelector
              initialValue={post.thumbnail as string}
              onChange={updateThumbnail}
            />
            <div className="inline-block">
              <ActionButton title="submit" onClick={handleSubmit} />
            </div>
          </div>
          <input
            type="text"
            className="py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-colors-secondary-dark dark:border-colors-secondary-light text-3xl font-semibold italic text-colors-primary-dark dark:text-primary mb-3"
            placeholder="Title"
            onChange={updateTitle}
            value={post.title}
          />
          <Toolbar />
          <div className="h-[1px] w-full bg-colors-secondary-dark dark:bg-colors-secondary-light my-3" />

          <EditLink />
        </div>
        <EditorContent editor={editor} className="min-h-[300px]" />

        <div className="h-[1px] w-full bg-colors-secondary-dark dark:bg-colors-secondary-light my-3" />
        <SEOForm
          onChange={updateSeoValue}
          title={post.title}
          initialValue={seoInitialValue}
        />
      </div>
    </>
  );
};

export default Editor;
