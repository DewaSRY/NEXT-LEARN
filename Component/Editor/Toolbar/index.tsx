import { FC } from "react";

import DropDownOption from "../../Common/DropDownOption";
import Button from "./Button";
import GalleryModal from "../GalleryModal";
import { useEditorContext } from "../../../Hooks/Use-EditorContext";
interface ToolbarProps {}
const Toolbar: FC<ToolbarProps> = ({}): JSX.Element | null => {
  const { userOption, toolIcons, Head } = useEditorContext();
  return (
    <>
      <div className="flex items-center">
        <DropDownOption option={userOption} Head={<Head />} />
        {toolIcons.map((Icon, id) => {
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
      <GalleryModal />
    </>
  );
};

export default Toolbar;
