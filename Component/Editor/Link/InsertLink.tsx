import { FC, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import Button from "../Toolbar/Button";
import LinkForm, { LinkOption } from "./LinkForm";

interface InsertLinkProps {
  onSubmit: (link: LinkOption) => void;
}

const InsertLink: FC<InsertLinkProps> = ({ onSubmit }): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div
      onKeyDown={({ key }) => (key === "Escape" ? setShowForm(false) : null)}
      className="relative"
    >
      <Button active={showForm} onClick={() => setShowForm((prev) => !prev)}>
        <BsLink45Deg />
      </Button>
      <div className="absolute top-full mt-4 right-0 z-50">
        <LinkForm visible={showForm} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default InsertLink;
