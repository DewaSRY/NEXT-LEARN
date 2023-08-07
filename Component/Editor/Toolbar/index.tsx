import { FC, useEffect } from "react";
import { Editor } from "@tiptap/react";

import DropDownOption from "../../DropDownOption";
import Button from "./Button";
import { getOptions, getIcons, getHeading, Head } from "./ToolBar-utils";
import useStoreContext from "../../../Hooks/use-StoreContext";
interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar: FC<ToolbarProps> = ({ editor }): JSX.Element | null => {
  const { LinksState } = useStoreContext();
  useEffect(() => {
    console.log(LinksState);
  }, [LinksState.url, LinksState]);

  if (!editor) return null;
  const Options = getOptions(editor);
  const ToolIcon = getIcons(editor);
  // const hadeSubmit = (link: LinkOption) => {
  //   console.log(link);
  // };
  return (
    <div className="flex items-center">
      <DropDownOption
        option={Options}
        Head={<Head getHeading={getHeading} editor={editor} />}
      />
      {ToolIcon.map((Icon, id) => {
        if (Icon.insert) {
          return (
            <Button key={id} onClick={Icon.onClick} active={Icon.active}>
              <Icon.icon />
            </Button>
          );
        } else {
          return <Icon.icon key={id} />;
        }
      })}
    </div>
  );
};

export default Toolbar;
