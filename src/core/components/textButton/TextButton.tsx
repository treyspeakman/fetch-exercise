import { FC } from "react";
import clsx from "clsx";
import styles from "./textButton.module.scss";

type Props = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const TextButton: FC<Props> = ({ text, onClick, className }) => {
  return (
    <button onClick={onClick} className={clsx(styles.textButton, className)}>
      {text}
    </button>
  );
};

export default TextButton;
