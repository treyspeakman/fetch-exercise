import styles from "./message.module.scss";
import { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { FC } from "react";
import clsx from "clsx";
import { memo } from "react";
import { ChatCompletionRequestMessage } from "openai";

type Props = {
  creator: ChatCompletionRequestMessage["role"];
  messageText: ChatCompletionRequestMessage["content"];
  children?: React.ReactNode;
  ifLatestMessage: boolean;
  firstMessage: boolean;
};
const Message: FC<Props> = ({
  creator,
  messageText,
  children,
  ifLatestMessage,
  firstMessage,
}) => {
  const [index, setIndex] = useState<number>(1);
  const [latestMessage, setLatestMessage] = useState<string>("");
  const messageRef = useRef<HTMLDivElement>(null);

  const renderMessageTyping = () => {
    if (messageText && index <= messageText.length)
      setLatestMessage((prev) => messageText.slice(0, index));
  };

  useEffect(() => {
    if (ifLatestMessage && !firstMessage) renderMessageTyping();
  }, []);

  useEffect(() => {
    setTimeout(() => setIndex((prev) => (prev += 1)), 20);
  }, [latestMessage]);

  useEffect(() => {
    if (ifLatestMessage) renderMessageTyping();
  }, [index]);

  useEffect(() => {
    if (messageRef.current) messageRef.current.scrollIntoView({ block: "end" });
  }, [messageRef.current?.scrollHeight]);

  return (
    <div
      ref={messageRef}
      className={clsx(
        styles.messageContainer,
        creator == "assistant"
          ? styles.chatMessageContainer
          : styles.userMessageContainer
      )}
    >
      <div
        className={clsx(
          styles.message,
          creator == "assistant" ? styles.chatMessage : styles.userMessage
        )}
      >
        <p className={styles.messageTextContainer}>
          {ifLatestMessage && !firstMessage && creator !== "user"
            ? latestMessage
            : messageText}
        </p>
      </div>
      {children}
    </div>
  );
};

export default memo(Message);
