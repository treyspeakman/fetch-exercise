import { FC } from "react";
import styles from "./expandableButton.module.scss";

type Props = {
  text: string;
};

const ExpandableButton: FC<Props> = ({ text }) => {
  return <button className={styles.expandableButton}>{text}</button>;
};

export default ExpandableButton;
