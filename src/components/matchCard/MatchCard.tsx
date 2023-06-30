import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Dog } from "@/lib/xstate/machines/DogSearchMachine";
import styles from "./matchCard.module.scss";
import { getDogAge } from "@/lib/utils/helpers/getDogAge";

interface Props {
  messageText: string;
  matchedDog: Dog;
}

const MatchCard: FC<Props> = ({ messageText, matchedDog }) => {
  const [index, setIndex] = useState<number>(1);
  const [liveMessage, setLiveMessage] = useState<string>("");

  const renderMessageTyping = () => {
    if (index <= messageText.length)
      setLiveMessage((prev) => messageText.slice(0, index));
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
          <span>{matchedDog.name}</span>
          <span>{getDogAge(matchedDog.age)}</span>
          <span>{matchedDog.zip_code}</span>
        </div>
        <div className={styles.dogIntro}>{liveMessage}</div>
      </div>
    )
  );
};

export default MatchCard;
