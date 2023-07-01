import styles from "./chatContainer.module.scss";
import { FC, useContext } from "react";
import clsx from "clsx";
import { ThreeDots } from "react-loading-icons";
import Button from "@/core/components/button/Button";
import { GlobalStateContext } from "@/lib/contexts/GlobalStateProvider";
import { useActor } from "@xstate/react";

type Props = {
  onRestart: () => void;
  children: React.ReactNode;
};

const ChatContainer: FC<Props> = ({ children, onRestart }) => {
  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.dogSearchService);

  const getStatusMessage = () => {
    if (
      state.matches("gettingMatchFromChat") ||
      state.matches("gettingResultsFromChat")
    ) {
      return "is finding a match";
    } else {
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
              {getStatusMessage()}
              <ThreeDots
                stroke="#000000"
                speed={0.25}
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
