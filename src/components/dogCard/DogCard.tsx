import Image from "next/image";
import styles from "./dogCard.module.scss";
import { FC } from "react";
import { Dog } from "@/lib/xstate/machines/dogSearchMachine/DogSearchMachine";
import { GlobalStateContext } from "@/lib/contexts/GlobalStateProvider";
import { useActor } from "@xstate/react";
import { useContext, useState } from "react";
import { Rings } from "react-loading-icons";
import { getDogAge } from "@/lib/utils/helpers/getDogAge";

const DogCard: FC<Dog> = (dog: Dog) => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.dogSearchService);

  return (
    <div
      className={styles.dogCard}
      onClick={() => send({ type: "SET_MATCH_FROM_CARD", dog })}
    >
      <div className={styles.imageContainer}>
        {state.matches("gettingCurrentDogs") ? (
          <Rings />
        ) : (
          <Image
            alt="Dog Picture"
            src={dog.img}
            fill
            style={{ objectFit: "contain" }}
          />
        )}
      </div>

      <div className={styles.dogDetails}>
        <span className={styles.dogName}>{dog.name}</span>
        <div className={styles.dogAgeAndBreed}>
          <span>{getDogAge(dog.age)}</span>
          <div className={styles.detailsDelimiter}></div>
          <span>{dog.breed}</span>
        </div>
        <span>{dog.zip_code}</span>
      </div>
    </div>
  );
};

export default DogCard;
