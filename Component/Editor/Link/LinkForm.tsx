import { FC, useState, useEffect } from "react";
import { useEditorContext } from "../../../Hooks";
interface LinkFormProps {
  visible: boolean;
  onVisible: (arg: boolean) => void;
  initialLinkState?: LinkOption;
  handleSubmit?: (arg: LinkOption) => void;
}
const DefaultState = {
  url: "",
  openInWeb: false,
};
export type LinkOption = { url: string; openInWeb: boolean };
const LinkForm: FC<LinkFormProps> = ({
  visible,
  onVisible,
  initialLinkState,
  handleSubmit,
}): JSX.Element | null => {
  const [linkState, setLinkState] = useState<LinkOption>(DefaultState);
  const { validateUrl, editor } = useEditorContext();
  const handleClickSubmit = () => {
    const { url, openInWeb } = linkState;
    if (!url.trim() || !editor) return;
    if (handleSubmit) {
      handleSubmit({ url, openInWeb });
    } else {
      if (openInWeb) {
        editor.commands.toggleLink({
          href: validateUrl(url),
          target: "_blank",
        });
      } else {
        editor.commands.toggleLink({
          href: url,
        });
      }
    }
    setLinkState(DefaultState);
    onVisible(false);
  };
  useEffect(() => {
    if (initialLinkState) {
      setLinkState(initialLinkState);
    }
  }, [initialLinkState]);
  if (!visible) return null;

  return (
    <div className="rounded p-2 bg-primary dark:bg-secondary-dark">
      <input
        autoFocus
        type="text"
        className="bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:border-primary-dark transition p-2 text-primary-dark dark:text-primary "
        placeholder="https://example.com"
        value={linkState.url}
        onChange={(e) =>
          setLinkState((prev) => ({ ...prev, url: e.target.value }))
        }
      />
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          id="open-in-new-tab"
          checked={linkState.openInWeb}
          onChange={({ target }) =>
            setLinkState((prev) => ({ ...prev, openInWeb: target.checked }))
          }
        />
        <label
          className="dark:text-primary text-primary-dark"
          htmlFor="open-in-new-tab"
        >
          open in new tab
        </label>
        <div className="flex-1 text-right">
          <button
            onClick={handleClickSubmit}
            className="bg-action px-2 py-1 text-primary rounded text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkForm;
