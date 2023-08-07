import { FC, useCallback, useState } from "react";
import { BsBoxArrowUpRight, BsPencilSquare } from "react-icons/bs";
import { BiUnlink } from "react-icons/bi";
import { BubbleMenu } from "@tiptap/react";
import { useEditorContext } from "../../../Hooks";
interface Props {}

const EditLink: FC<Props> = ({}): JSX.Element | null => {
  const { editor, cainsEditor } = useEditorContext();
  const [showEditForm, setShowEditForm] = useState(false);

  const handleOnLinkOpenClick = useCallback(() => {
    const { href } = editor!.getAttributes("link");
    if (href) {
      window.open(href, "_blank");
    }
  }, [editor]);

  const handleLinkEditClick = () => {
    setShowEditForm(true);
  };

  const handleUnlinkClick = () => {
    editor!.commands.unsetLink();
  };

  // const handleSubmit = ({ url, openInNewTab }: linkOption) => {
  //   cainsEditor()!
  //     .unsetLink()
  //     .setLink({ href: url, target: openInNewTab ? "_blank" : "" })
  //     .run();
  //   setShowEditForm(false);
  // };

  const getInitialState = useCallback(() => {
    const { href, target } = editor!.getAttributes("link");
    return { url: href, openInNewTab: target ? true : false };
  }, [editor]);
  if (!editor) return null;

  return (
    <BubbleMenu
      shouldShow={({ editor }) => editor.isActive("link")}
      editor={editor}
      tippyOptions={{
        onHide: () => {
          setShowEditForm(false);
        },
      }}
    >
      {!showEditForm && (
        <div className="rounded bg-primary dark:bg-primary-dark text-primary-dark dark:text-primary shadow-secondary-dark shadow-md p-3 flex items-center space-x-6 z-50">
          <button onClick={handleOnLinkOpenClick}>
            <BsBoxArrowUpRight />
          </button>

          <button onClick={handleLinkEditClick}>
            <BsPencilSquare />
          </button>

          <button onClick={handleUnlinkClick}>
            <BiUnlink />
          </button>
        </div>
      )}
    </BubbleMenu>
  );
};

export default EditLink;
