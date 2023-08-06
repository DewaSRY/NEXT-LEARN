import { FC, useState } from "react";

interface LinkFormProps {
  visible: boolean;
  onSubmit: (link: LinkOption) => void;
}

export type LinkOption = { url: string; openInWeb: boolean };
const LinkForm: FC<LinkFormProps> = ({
  visible,
  onSubmit,
}): JSX.Element | null => {
  const [linkState, setLinkState] = useState<LinkOption>({
    url: "",
    openInWeb: false,
  });
  if (!visible) {
    return null;
  }
  const handleSubmit = () => {
    if (!linkState.url.trim()) return;
    if (!onSubmit) return;
    onSubmit(linkState);
  };
  return (
    <div className="rounded p-2 bg-colors-primary dark:bg-colors-secondary-dark">
      <input
        autoFocus
        type="text"
        className="bg-transparent rounded border-2 border-colors-secondary-dark focus:border-colors-primary-dark dark:border-colors-primary-dark transition p-2 text-colors-primary-dark dark:text-colors-primary "
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
          className="dark:text-colors-primary text-colors-primary-dark"
          htmlFor="open-in-new-tab"
        >
          open in new tab
        </label>
        <div className="flex-1 text-right">
          <button
            onClick={handleSubmit}
            className="bg-colors-action px-2 py-1 text-colors-primary rounded text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkForm;
