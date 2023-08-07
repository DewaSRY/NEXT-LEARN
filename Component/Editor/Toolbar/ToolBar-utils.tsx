import { Editor } from "@tiptap/react";
import { FC } from "react";
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
import InsertLink from "../Link/InsertLink";
import { AiFillCaretDown } from "react-icons/ai";

type editor = Editor;
const Separator: FC<{}> = (props): JSX.Element => {
  return (
    <div className="h-4 w-[1px] bg-colors-secondary-dark dark:bg-colors-secondary-light m-5" />
  );
};

export function cainsEditor(editor: editor) {
  return editor.chain().focus();
}
export function getHeading(editor: editor): string {
  if (editor?.isActive("heading", { level: 1 })) return "Heading 1";
  if (editor?.isActive("heading", { level: 2 })) return "Heading 2";
  if (editor?.isActive("heading", { level: 3 })) return "Heading 3";
  return "Paragraphs";
}
export const Head: FC<{
  getHeading: (editor: editor) => string;
  editor: editor;
}> = ({ getHeading, editor }): JSX.Element => {
  return (
    <div className="flex items-center  space-x-2 text-colors-primary-dark dark:text-colors-secondary-dark ">
      <p>{getHeading(editor)}</p>
      <AiFillCaretDown />
    </div>
  );
};
export function getOptions(editor: editor) {
  return [
    {
      label: "Paragraph",
      onClick: () => cainsEditor(editor).setParagraph().run(),
    },
    {
      label: "Heading 1",
      onClick: () => cainsEditor(editor).toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      onClick: () => cainsEditor(editor).toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      onClick: () => cainsEditor(editor).toggleHeading({ level: 3 }).run(),
    },
  ];
}
export function getIcons(editor: editor) {
  return [
    {
      icon: Separator,
      onClick: () => {},
      insert: false,
    },
    {
      icon: BsTypeBold,
      onClick: () => cainsEditor(editor).toggleBold().run(),
      active: editor.isActive("bold"),
      insert: true,
    },
    {
      icon: BsTypeItalic,
      onClick: () => cainsEditor(editor).toggleItalic().run(),
      active: editor.isActive("italic"),
      insert: true,
    },
    {
      icon: BsTypeUnderline,
      onClick: () => cainsEditor(editor).toggleUnderline().run(),
      active: editor.isActive("underline"),
      insert: true,
    },
    {
      icon: BsTypeStrikethrough,
      onClick: () => cainsEditor(editor).toggleStrike().run(),
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
      onClick: () => cainsEditor(editor).toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
      insert: true,
    },
    {
      icon: BsCode,
      onClick: () => cainsEditor(editor).toggleCode().run(),
      active: editor.isActive("code"),
      insert: true,
    },
    {
      icon: BsBraces,
      onClick: () => cainsEditor(editor).toggleCodeBlock().run(),
      active: editor.isActive("codeBlock"),
      insert: true,
    },
    {
      icon: InsertLink,
      onClick: () => {},
      insert: false,
    },
    {
      icon: BsListOl,
      onClick: () => cainsEditor(editor).toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      insert: true,
    },
    {
      icon: BsListUl,
      onClick: () => cainsEditor(editor).toggleBulletList().run(),
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
}
