import { FC, useState, ReactNode } from "react";

export interface Option {
  label: string;
  onClick: () => void;
}
interface DropDownOptionProps {
  option: Option[];
  Head: ReactNode;
}

const DropDownOption: FC<DropDownOptionProps> = ({
  option,
  Head,
}): JSX.Element => {
  const [showOption, setShowOption] = useState(false);
  return (
    <button
      onBlur={() => setShowOption(() => false)}
      onClick={() => setShowOption((prev) => !prev)}
      className="relative"
    >
      {Head}
      {showOption && (
        <div className="min-w-max absolute  mt-4 left-0 top-1  z-10 border-2 border-primary-dark dark:border-primary text-left bg-primary dark:bg-secondary-dark">
          <ul className="p-3 space-y-3">
            {option.map((option, id) => {
              return (
                <li key={id} onClick={option.onClick}>
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </button>
  );
};

export default DropDownOption;
