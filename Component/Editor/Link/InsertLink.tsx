import { FC, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import Button from "../Toolbar/Button";
import LinkForm from "./LinkForm";

interface InsertLinkProps {}

const InsertLink: FC<InsertLinkProps> = ({}): JSX.Element => {
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
        <LinkForm visible={showForm} />
      </div>
    </div>
  );
};

export default InsertLink;
