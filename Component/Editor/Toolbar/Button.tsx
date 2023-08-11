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
      return "dark:bg-primary dark:text-primary-dark bg-primary-dark text-primary  ";
    } else {
      return "text-secondary-light bg-secondary-dark ";
    }
  }, [active]);
  const commonClasses =
    "p-2 rounded text-lg hover:scale-110 hover:shadow-md transition m-2 ";
  return (
    <button {...rest} className={commonClasses + getActiveStyle()}>
      {children}
    </button>
  );
};

export default Button;
