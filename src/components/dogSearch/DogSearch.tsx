import { useContext, useEffect, useState } from "react";
import DogCard from "../dogCard/DogCard";
import { GlobalStateContext } from "@/lib/contexts/GlobalStateProvider";
import { useActor } from "@xstate/react";

import styles from "./dogSearch.module.scss";

const DogSearch = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.dogSearchService);

  // const [dogPage, setDogPage] = useState<DogPage | undefined>();
  // const [currentDogs, setCurrentDogs] = useState<Dog[]>([]);

  useEffect(() => {
    send({
      type: "GET_ALL_DOG_PAGES",
    });
  }, []);

  // useEffect(() => {}, [dogPage]);

  return (
    <div className={styles.dogSearch}>
      <div className={styles.cardGrid}>
        {state?.context.currentDogs.map((dog) => (
          <DogCard
            age={dog.age}
            breed={dog.breed}
            name={dog.name}
            zip_code={dog.zip_code}
            img={dog.img}
          />
        ))}
      </div>
    </div>
  );
};

export default DogSearch;
