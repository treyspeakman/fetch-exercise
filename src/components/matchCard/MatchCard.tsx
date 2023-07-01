import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Dog } from "@/lib/xstate/machines/dogSearchMachine/DogSearchMachine";
import styles from "./matchCard.module.scss";
import { getDogAge } from "@/lib/utils/helpers/getDogAge";
import { useContext } from "react";
import { GlobalStateContext } from "@/lib/contexts/GlobalStateProvider";
import { useActor } from "@xstate/react";
import { Rings } from "react-loading-icons";

interface Props {
  messageText: string;
  matchedDog: Dog;
}

const MatchCard: FC<Props> = ({ messageText, matchedDog }) => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.dogSearchService);
  const [index, setIndex] = useState<number>(1);
  const [liveMessage, setLiveMessage] = useState<string>("");

  const renderMessageTyping = () => {
    if (index <= messageText.length)
      setLiveMessage(messageText.slice(0, index));
  };

  useEffect(() => {
    setIndex(1);
    renderMessageTyping();
  }, [messageText]);

  useEffect(() => {
    setTimeout(() => setIndex((prev) => (prev += 1)), 20);
  }, [liveMessage]);

  useEffect(() => {
    renderMessageTyping();
  }, [index]);

  return (
    matchedDog && (
      <div className={styles.matchCard}>
        <div className={styles.imageContainer}>
          <Image
            alt="Dog Picture"
            src={matchedDog.img}
            fill
            style={{ objectFit: "contain" }}
          ></Image>
        </div>
        <div className={styles.detailsContainer}>
          <span className={styles.name}>{matchedDog.name}</span>
          <>
            <span>{getDogAge(matchedDog.age)}</span>
            <span>{matchedDog.zip_code}</span>
          </>
        </div>
        <div className={styles.dogIntro}>
          {state.matches("getDogIntro") ? (
            <Rings className={styles.loadingRings} />
          ) : (
            liveMessage
          )}
        </div>
      </div>
    )
  );
};

export default MatchCard;
