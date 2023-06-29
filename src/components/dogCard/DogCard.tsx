import Image from "next/image";
import styles from "./dogCard.module.scss";
import { FC } from "react";
import { Dog } from "@/lib/xstate/machines/DogSearchMachine";
import { GlobalStateContext } from "@/lib/contexts/GlobalStateProvider";
import { useActor } from "@xstate/react";
import { useContext, useState } from "react";
import { Rings } from "react-loading-icons";

const dogAges = {
  1: "Puppy",
  3: "Young",
  8: "Adult",
  100: "Senior",
};

const getDogAge = (age: number): string | undefined => {
  const descriptiveAge = Object.entries(dogAges).find(
    ([key]) => Number(key) > age
  )?.[1];
  return descriptiveAge;
};

const DogCard: FC<Dog> = ({ img, name, age, zip_code, breed }) => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.dogSearchService);

  return (
    <div className={styles.dogCard}>
      <div className={styles.imageContainer}>
        {state.matches("gettingCurrentDogs") ? (
          <Rings />
        ) : (
          <Image
            alt="Dog Picture"
            src={img}
            fill
            style={{ objectFit: "contain" }}
          />
        )}
      </div>

      <div className={styles.dogDetails}>
        <span className={styles.dogName}>{name}</span>
        <div className={styles.dogAgeAndBreed}>
          <span>{getDogAge(age)}</span>
          <div className={styles.detailsDelimiter}></div>
          <span>{breed}</span>
        </div>
      </div>
    </div>
  );
};

export default DogCard;
