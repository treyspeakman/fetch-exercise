import { useState, FC } from "react";
import clsx from "clsx";
import SendIcon from "/public/icons/send.svg";
import styles from "./input.module.scss";

type Props = {
  className?: string;
  placeholder: string;
  onSubmit: any;
  label?: string;
  sendIcon: boolean;
};

const Input: FC<Props> = ({
  className,
  placeholder,
  onSubmit,
  sendIcon,
  label,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label} htmlFor="inputField">
        {label}
      </label>
      <div className={styles.inputContainer}>
        <input
          id="inputField"
          className={clsx(styles.input, className)}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
        {sendIcon && (
          <div
            className={styles.iconContainer}
            onClick={(e) => inputValue.length > 0 && handleSubmit(e)}
          >
            <SendIcon
              className={clsx(
                styles.icon,
                inputValue.length > 0 && styles.sendable
              )}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default Input;
