import { FC, useState } from "react";
import { BsYoutube } from "react-icons/bs";
import Button from "./Button";
import ActionButton from "../../Common/ActionButton";
import { useEditorContext } from "../../../Hooks";
interface Props {
  //   onSubmit(link: string): void;
}

const EmbedYoutube: FC<Props> = (): JSX.Element => {
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const { cainsEditor } = useEditorContext();

  const handleSubmit = () => {
    if (!url.trim()) return hideForm();
    cainsEditor().setYoutubeVideo({ src: url }).run();
    // onSubmit(url);
    setUrl("");
    hideForm();
  };

  const hideForm = () => setVisible(false);
  const showForm = () => setVisible(true);

  return (
    <div
      onKeyDown={({ key }) => {
        if (key === "Escape") hideForm();
      }}
      className="relative bg-secondary dark:bg-primary-dark"
    >
      <Button onClick={visible ? hideForm : showForm}>
        <BsYoutube />
      </Button>

      {visible && (
        <div className="absolute top-full mt-4 right-0 z-50">
          <div className="flex space-x-2">
            <input
              autoFocus
              type="text"
              className="bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary"
              placeholder="https://youtube.com"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <ActionButton title="Embed" onClick={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbedYoutube;
