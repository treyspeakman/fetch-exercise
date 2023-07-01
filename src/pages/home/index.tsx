import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import PromptLogin from "@/components/promptLogin/PromptLogin";
import DogSearch from "@/components/dogSearch/DogSearch";
import Input from "@/core/components/input/Input";
import {
  ChatContainer,
  InputRow,
  Message,
  MessagesContainer,
} from "@/components/chatBoard";
import { ChatCompletionRequestMessage } from "openai";
import { GlobalStateContext } from "@/lib/contexts/GlobalStateProvider";
import { useActor } from "@xstate/react";
import type { ChatHistory, ChatMessage } from "@/server/routers/chatgpt";
import { dogFinderQuestions } from "@/lib/utils/chatgpt/systemMessages";

import styles from "./home.module.scss";

const Home = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.dogSearchService);
  const [messageQueue, setMessagesQueue] =
    useState<ChatCompletionRequestMessage[]>(dogFinderQuestions);
  const [messages, setMessages] = useState<ChatHistory>([
    {
      role: "assistant",
      content: `Welcome! I'm here to help you find the perfect dog match. I'll ask you a few questions and then provide a recommendation. Let's begin by discussing your size preference for the dog. Would you prefer a small, medium, or large-sized dog?`,
    },
  ]);

  const handleRestart = () => {
    setMessagesQueue(dogFinderQuestions);
    setMessages((prev) => [prev[0]]);
  };

  useEffect(() => {
    if (messages.length % 2 == 0) {
      const currentQueue = [...messageQueue];
      const nextMessage = currentQueue.pop();
      setMessagesQueue(currentQueue);
      if (nextMessage) {
        setMessages((prevMessages) => [
          ...prevMessages,
          nextMessage as ChatMessage,
        ]);
      } else {
        send({ type: "FIND_MATCH_FROM_CHAT", chat: messages });
      }
    }
  }, [messages]);

  return (
    <>
      <Head>
        <title>Dog Finder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dog.ico" />
      </Head>
      {state.context.authed ? (
        <div className={styles.dogSearchContainer}>
          <div className={styles.chatContainer}>
            <ChatContainer onRestart={handleRestart}>
              <MessagesContainer>
                {messages.map(
                  (chatMessage: ChatCompletionRequestMessage, i) => (
                    <Message
                      creator={chatMessage.role}
                      messageText={chatMessage.content}
                      key={i}
                      ifLatestMessage={i == messages.length - 1}
                      firstMessage={i == 0}
                    />
                  )
                )}
              </MessagesContainer>
              <InputRow>
                <Input
                  sendIcon={true}
                  onSubmit={(input: string) =>
                    setMessages([
                      ...messages,
                      {
                        role: "user",
                        content: input,
                      },
                    ])
                  }
                  placeholder="Send a message"
                ></Input>
              </InputRow>
            </ChatContainer>
          </div>
          <DogSearch />
        </div>
      ) : (
        <PromptLogin />
      )}
    </>
  );
};

export default Home;
