import { FC, useLayoutEffect, useRef } from "react";
import styles from "./messagesContainer.module.scss";

type Props = {
  children: React.ReactNode;
};

const MessagesContainer: FC<Props> = ({ children }) => {
  return (
    <div className={styles.messagesContainer}>
      <div className={styles.scrollableChat}>{children}</div>
    </div>
  );
};

export default MessagesContainer;
