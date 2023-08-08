import { ChainedCommands } from "@tiptap/react";
import { FC } from "react";
import { useContext } from "react";
import { EditorContext, GalleryContext } from "../Context";
import { RiDoubleQuotesL } from "react-icons/ri";
import {
  BsTypeBold,
  BsTypeStrikethrough,
  BsBraces,
  BsCode,
  BsListOl,
  BsListUl,
  BsTypeItalic,
  BsTypeUnderline,
  BsImageFill,
} from "react-icons/bs";
import InsertLink from "../Component/Editor/Link/InsertLink";
import EmbedYoutube from "../Component/Editor/Toolbar/EmbedYoutube";
import { AiFillCaretDown } from "react-icons/ai";

export function useToolbarUtils() {
  const { editor } = useContext(EditorContext);
  const { toggleGallery } = useContext(GalleryContext);

  const userOption = [
    {
      label: "Paragraph",
      onClick: () => cainsEditor()!.setParagraph().run(),
    },
    {
      label: "Heading 1",
      onClick: () => cainsEditor()!.toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      onClick: () => cainsEditor()!.toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      onClick: () => cainsEditor()!.toggleHeading({ level: 3 }).run(),
    },
  ];
  const Separator: FC<{}> = (props): JSX.Element => {
    return (
      <div className="h-4 w-[1px] bg-colors-secondary-dark dark:bg-colors-secondary-light m-5" />
    );
  };
  function getHeading(): string {
    if (editor?.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor?.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor?.isActive("heading", { level: 3 })) return "Heading 3";
    return "Paragraphs";
  }
  const Head: FC<{}> = (): JSX.Element => {
    return (
      <div className="flex items-center  space-x-2 text-colors-primary-dark dark:text-colors-secondary-dark ">
        <p>{getHeading()}</p>
        <AiFillCaretDown />
      </div>
    );
  };
  const toolIcons = [
    {
      icon: Separator,
      onClick: () => {},
      insert: false,
      active: false,
    },
    {
      icon: BsTypeBold,
      onClick: () => cainsEditor()!.toggleBold().run(),
      active: editor?.isActive("bold"),
      insert: true,
    },
    {
      icon: BsTypeItalic,
      onClick: () => cainsEditor()!.toggleItalic().run(),
      active: editor?.isActive("italic"),
      insert: true,
    },
    {
      icon: BsTypeUnderline,
      onClick: () => cainsEditor()!.toggleUnderline().run(),
      active: editor?.isActive("underline"),
      insert: true,
    },
    {
      icon: BsTypeStrikethrough,
      onClick: () => cainsEditor()!.toggleStrike().run(),
      active: editor?.isActive("strike"),
      insert: true,
    },
    {
      icon: Separator,
      onClick: () => {},
      active: false,
      insert: false,
    },
    {
      icon: RiDoubleQuotesL,
      onClick: () => cainsEditor()!.toggleBlockquote().run(),
      active: editor?.isActive("blockquote"),
      insert: true,
    },
    {
      icon: BsCode,
      onClick: () => cainsEditor()!.toggleCode().run(),
      active: editor?.isActive("code"),
      insert: true,
    },
    {
      icon: BsBraces,
      onClick: () => cainsEditor()!.toggleCodeBlock().run(),
      active: editor?.isActive("codeBlock"),
      insert: true,
    },
    {
      icon: InsertLink,
      onClick: () => {},
      active: false,
      insert: false,
    },
    {
      icon: BsListOl,
      onClick: () => cainsEditor()!.toggleOrderedList().run(),
      active: editor?.isActive("orderedList"),
      insert: true,
    },
    {
      icon: BsListUl,
      onClick: () => cainsEditor()!.toggleBulletList().run(),
      active: editor?.isActive("bulletList"),
      insert: true,
    },
    {
      icon: Separator,
      onClick: () => {},
      active: false,
      insert: false,
    },

    {
      icon: EmbedYoutube,
      onClick: () => {},
      active: false,
      insert: false,
    },
    {
      icon: BsImageFill,
      onClick: () => toggleGallery(),
      active: false,
      insert: true,
    },
  ];
  function validateUrl(ur: string) {
    let finalUrl;
    try {
      finalUrl = new URL(ur);
    } catch (err) {
      finalUrl = new URL(`http://${ur}.com`);
    }
    return finalUrl.origin;
  }

  const cainsEditor = (): ChainedCommands => {
    return editor!.chain().focus();
  };

  return {
    userOption,
    Head,
    toolIcons,
    validateUrl,
    cainsEditor,
    editor,
  };
}
