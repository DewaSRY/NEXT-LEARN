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
        <div className="min-w-max absolute top-full mt-4 right-2 z-40 border-2 border-primary-dark dark:border-primary rounded text-left bg-primary dark:bg-primary-dark">
          <ul className="p-3 space-y-3">
            {option.map(({ label, onClick }, index) => {
              return (
                <li
                  className="text-primary-dark dark:text-primary"
                  key={label + index}
                  onMouseDown={onClick}
                >
                  {label}
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
