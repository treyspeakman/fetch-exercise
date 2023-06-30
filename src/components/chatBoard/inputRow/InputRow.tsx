import { FC } from "react";
import styles from "./inputRow.module.scss";

type Props = {
  children: React.ReactNode;
};

const InputRow: FC<Props> = ({ children }) => {
  return <div className={styles.inputRow}>{children}</div>;
};

export default InputRow;
