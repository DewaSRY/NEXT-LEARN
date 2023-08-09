import { FC, ChangeEventHandler, useState, useEffect } from "react";
import { EditorContent } from "@tiptap/react";
import SEOForm from "./SeoForm";
import { useEditorContext } from "../../Hooks";
import ThumbnailSelector from "./ThumbnailSelector";
import ActionButton from "../Common/ActionButton";
import slugify from "slugify";
import Toolbar from "./Toolbar";
import EditLink from "./Link/EditLink";
interface EditorProps {
  initialValue?: FinalPost;
  onSubmit(post: FinalPost): void;
  busy?: boolean;
  btnTitle: string;
}
export interface FinalPost {
  title: string;
  content: string;
  thumbnail?: File | string;
  meta: string;
  tags: string;
  slug: string;
  id?: string;
}

const Editor: FC<EditorProps> = ({
  initialValue,
  onSubmit,
  busy = false,
  btnTitle,
}): JSX.Element | null => {
  const { editor } = useEditorContext();
  const [post, setPost] = useState<FinalPost>({
    title: "",
    content: "",
    meta: "",
    tags: "",
    slug: "",
  });
  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = ({ target }) => {
    let { name, value } = target;
    if (name === "meta") value = value.substring(0, 150);
    setPost((prev) => ({ ...prev, [name]: value }));
  };
  const updateThumbnail = (file: File) => setPost({ ...post, thumbnail: file });
  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({ ...post, content: editor.getHTML() });
  };

  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue, slug: slugify(initialValue.slug) });
      editor?.commands.setContent(initialValue.content);
    }
  }, [initialValue, editor]);
  useEffect(() => {
    const slug = slugify(post.title.toLowerCase());
    setPost((prev) => ({ ...prev, slug }));
  }, [post.title]);
  if (!editor) return null;

  return (
    <>
      <div className="max-w-4xl mx-auto p-3 dark:bg-primary-dark bg-primary transition">
        {/* Thumbnail Selector and Submit Button */}
        <div className="sticky top-0 z-10 dark:bg-primary-dark bg-primary">
          <div className="flex items-center justify-between mb-3">
            <ThumbnailSelector
              initialValue={post.thumbnail as string}
              onChange={updateThumbnail}
            />
            <div className="inline-block">
              <ActionButton
                title={btnTitle}
                onClick={handleSubmit}
                busy={busy}
              />
            </div>
          </div>
          <input
            type="text"
            className="py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3"
            placeholder="Title"
            onChange={handleChange}
            value={post.title}
            name="title"
          />
          <Toolbar />
          <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
          <EditLink />
        </div>
        <EditorContent editor={editor} className="min-h-[300px]" />
        <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
        <SEOForm
          value={post}
          // initialValue={seoInitialValue}
          handleChange={handleChange}
        />
      </div>
    </>
  );
};

export default Editor;
