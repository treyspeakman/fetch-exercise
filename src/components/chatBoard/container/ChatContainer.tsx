import styles from "./chatContainer.module.scss";
import { FC, useState, useEffect } from "react";
import clsx from "clsx";
import LoadingMapEmoji from "public/icons/loading-map-emoji.svg";
import WaitingEmoji from "public/icons/waiting-emoji.svg";
import { ThreeDots } from "react-loading-icons";
import Button from "@/core/components/button/Button";
import { ChatHistory } from "@/server/routers/chatgpt";

type Props = {
  status: "WAITING" | "THINKING" | "LOADING_MAP";
  onRestart: () => void;
  children: React.ReactNode;
};

const ChatContainer: FC<Props> = ({ status, children, onRestart }) => {
  const getStatusMessage = (status: Props["status"]) => {
    switch (status) {
      case "THINKING":
        return "is thinking";
      case "WAITING":
        return "is waiting";
    }
  };

  return (
    <div className={clsx(styles.chatContainer)}>
      <div className={styles.chatHeader}>
        <div className={styles.chatInfo}>
          {/* <div className={styles.emojiIcon}>{getEmojiIcon(status)}</div> */}
          <div className={styles.titleAndStatus}>
            <h6 className={styles.chatTitle}> Doggo Discoverer </h6>
            <span className={styles.chatStatus}>
              {getStatusMessage(status)}
              <ThreeDots
                stroke="#000000"
                speed={status == "WAITING" ? 0.25 : 0.75}
                fill="green"
                className={styles.threeDots}
              />
            </span>
          </div>
        </div>
        <Button
          onClick={() => onRestart()}
          className={styles.restartButton}
          text="Restart"
        ></Button>
      </div>
      {children}
    </div>
  );
};

export default ChatContainer;
