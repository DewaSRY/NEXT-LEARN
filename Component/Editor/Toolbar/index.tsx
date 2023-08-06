import { FC } from "react";
import { Editor } from "@tiptap/react";
import { AiFillCaretDown } from "react-icons/ai";
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
  BsYoutube,
} from "react-icons/bs";
import DropDownOption from "../../DropDownOption";
import Button from "./Button";
import InsertLink from "../Link/InsertLink";
import { LinkOption } from "../Link/LinkForm";
interface ToolbarProps {
  editor: Editor | null;
}

const Head: FC<{ getHeading: () => string }> = ({
  getHeading,
}): JSX.Element => {
  return (
    <div className="flex items-center  space-x-2 text-colors-primary-dark dark:text-colors-secondary-dark ">
      <p>{getHeading()}</p>
      <AiFillCaretDown />
    </div>
  );
};

const Separator: FC<{}> = (props): JSX.Element => {
  return (
    <div className="h-4 w-[1px] bg-colors-secondary-dark dark:bg-colors-secondary-light m-5" />
  );
};

const Toolbar: FC<ToolbarProps> = ({ editor }): JSX.Element | null => {
  if (!editor) return null;
  const Options = [
    {
      label: "Paragraph",
      onClick: () => editor.chain().focus().setParagraph().run(),
    },
    {
      label: "Heading 1",
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
  ];
  const ToolIcon = [
    {
      icon: Separator,
      onClick: () => {},
      insert: false,
    },
    {
      icon: BsTypeBold,
      onClick: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      insert: true,
    },
    {
      icon: BsTypeItalic,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      insert: true,
    },
    {
      icon: BsTypeUnderline,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
      insert: true,
    },
    {
      icon: BsTypeStrikethrough,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      insert: true,
    },
    {
      icon: Separator,
      onClick: () => {},
      insert: false,
    },
    {
      icon: RiDoubleQuotesL,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
      insert: true,
    },
    {
      icon: BsCode,
      onClick: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive("code"),
      insert: true,
    },

    {
      icon: BsBraces,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editor.isActive("codeBlock"),
      insert: true,
    },
    {
      icon: InsertLink,
      onClick: () => {},
      insert: false,
      onSubmit: (l: LinkOption) => hadeSubmit(l),
    },
    {
      icon: BsListOl,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      insert: true,
    },
    {
      icon: BsListUl,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      insert: true,
    },
    {
      icon: Separator,
      onClick: () => {},
      insert: false,
    },
    {
      icon: BsImageFill,
      onClick: () => {},
      active: false,
      insert: true,
    },
    {
      icon: BsYoutube,
      onClick: () => {},
      active: false,
      insert: true,
    },
  ];
  function getHeading(): string {
    if (editor?.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor?.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor?.isActive("heading", { level: 3 })) return "Heading 3";
    return "Paragraphs";
  }
  const hadeSubmit = (link: LinkOption) => {
    console.log(link);
  };
  return (
    <div className="flex items-center">
      <DropDownOption
        option={Options}
        Head={<Head getHeading={getHeading} />}
      />
      {ToolIcon.map((Icon, id) => {
        if (Icon.insert) {
          return (
            <Button key={id} onClick={Icon.onClick} active={Icon.active}>
              <Icon.icon />
            </Button>
          );
        } else {
          return <Icon.icon key={id} onSubmit={hadeSubmit} />;
        }
      })}
    </div>
  );
};

export default Toolbar;
