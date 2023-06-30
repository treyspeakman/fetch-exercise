import { FC, useEffect, useRef } from "react";
import styles from "./messagesContainer.module.scss";

type Props = {
  children: React.ReactNode;
};

const MessagesContainer: FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div className={styles.messagesContainer}>
      <div ref={containerRef} className={styles.scrollableChat}>
        {children}
      </div>
    </div>
  );
};

export default MessagesContainer;
