import { FC } from "react";
import styles from "./chatPanelContainer.module.scss";

type Props = {
  children: React.ReactNode;
};

const ChatPanelContainer: FC<Props> = ({ children }) => {
  return <div className={styles.chatPanelContainer}>{children}</div>;
};

export default ChatPanelContainer;
