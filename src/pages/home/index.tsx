import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import PromptLogin from "@/components/promptLogin/PromptLogin";
import { FC, SetStateAction } from "react";
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

interface Props {
  authed: boolean;
  handleAuthChange: (
    loginStatus: boolean
  ) => React.Dispatch<SetStateAction<boolean>>;
}
import styles from "./home.module.scss";
import { dogFinderQuestions } from "@/lib/utils/chatgpt/systemMessages";

const Home: FC<Props> = ({ authed, handleAuthChange }) => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.dogSearchService);
  const [messageQueue, setMessagesQueue] =
    useState<ChatCompletionRequestMessage[]>(dogFinderQuestions);
  const [messages, setMessages] = useState<ChatHistory>([
    {
      role: "assistant",
      content:
        "Hi, I'm here to assist you in finding the perfect dog match. I'm going to ask you a couple of questions, then recommend a match for you. To get started, do you have any size preference for the dog (small, medium, large)?",
    },
  ]);

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
        console.log("sending chat");
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
      {authed ? (
        <div className={styles.dogSearchContainer}>
          <div className={styles.chatContainer}>
            <ChatContainer status="WAITING">
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
                  placeholder="Send message to Trip Brainy"
                ></Input>
              </InputRow>
            </ChatContainer>
          </div>
          <DogSearch />
        </div>
      ) : (
        <PromptLogin handleAuthChange={handleAuthChange} />
      )}
    </>
  );
};

export default Home;
