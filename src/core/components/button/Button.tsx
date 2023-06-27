import { FC } from "react";
import clsx from "clsx";
import styles from "./button.module.scss";

type Props = {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: FC<Props> = ({ type, text, children, onClick, className }) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, className)}
      onClick={onClick}
    >
      {text || children}
    </button>
  );
};

export default Button;
