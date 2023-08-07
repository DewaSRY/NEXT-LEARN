import {
  FC,
  ReactNode,
  MouseEventHandler,
  HtmlHTMLAttributes,
  useCallback,
} from "react";
// import { BsTruckFlatbed } from "react-icons/bs";

type ButtonProps = {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & HtmlHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  active,
  children,
  ...rest
}): JSX.Element => {
  const getActiveStyle = useCallback(() => {
    if (active) {
      return " dark:bg-colors-primary dark:text-colors-primary-dark bg-colors-primary-dark ";
    } else {
      return " text-colors-secondary-light bg-colors-secondary-dark ";
    }
  }, [active]);
  const commonClasses =
    "p-2 rounded m-1 text-lg hover:scale-110 hover:shadow-md transition ";
  return (
    <button {...rest} className={commonClasses + getActiveStyle()}>
      {children}
    </button>
  );
};

export default Button;
