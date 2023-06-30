import { useContext, useEffect, useState } from "react";
import { DogSearchContext } from "@/lib/xstate/machines/DogSearchMachine";
import clsx from "clsx";
import DogCard from "../dogCard/DogCard";
import { GlobalStateContext } from "@/lib/contexts/GlobalStateProvider";
import { useActor } from "@xstate/react";
import DropdownItem from "@/core/components/dropdownItem/DropdownItem";
import SortIcon from "public/icons/sort.svg";

import styles from "./dogSearch.module.scss";
import Pagination from "@/core/components/pagination/Pagination";
import SearchHeader from "../searchHeader/searchHeader";
import Dropdown from "@/core/components/dropdown/Dropdown";
import FilterIcon from "../filterIcon/FilterIcon";
import Button from "@/core/components/button/Button";
import MatchCard from "../matchCard/MatchCard";

const sortItems: DogSearchContext["sortBy"][] = ["breed", "age", "name"];

const DogSearch = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.dogSearchService);

  return (
    <div className={styles.dogSearch}>
      <div className={styles.searchHeader}>
        <SearchHeader renderIcon={() => <FilterIcon />}>
          <Dropdown title="Breed">
            {state.context.breeds.map((breed) => (
              <DropdownItem
                text={breed}
                onSelect={() => send({ type: "NEW_BREED_FILTER", breed })}
                onRemove={() => {}}
              ></DropdownItem>
            ))}
          </Dropdown>
        </SearchHeader>
        <Button
          onClick={() =>
            state.context.match.name
              ? send({ type: "REMOVE_MATCH" })
              : send({ type: "FIND_A_MATCH" })
          }
          className={styles.findAMatchButton}
          text={state.context.match.name ? "Back to Search" : "Find a Match"}
        />
        <SearchHeader
          renderIcon={() => (
            <SortIcon
              onClick={() =>
                send({
                  type: "NEW_SORT_DIRECTION",
                  direction:
                    state.context.sortDirection == "ASCENDING"
                      ? "DESCENDING"
                      : "ASCENDING",
                })
              }
              className={clsx(
                styles.sortIcon,
                state.context.sortDirection == "DESCENDING"
                  ? styles.descending
                  : styles.ascending
              )}
            />
          )}
        >
          <Dropdown title={state.context.sortBy}>
            {sortItems
              .filter((field) => field !== state.context.sortBy)
              .map((field) => (
                <DropdownItem
                  key={field}
                  text={field}
                  onSelect={() => send({ type: "NEW_SORT_FIELD", field })}
                />
              ))}
          </Dropdown>
        </SearchHeader>
      </div>

      {state.context.match.name ? (
        <MatchCard
          messageText={state.context.dogIntro}
          matchedDog={state.context.match}
        />
      ) : (
        <>
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
          <div className={styles.paginationContainer}>
            <Pagination />
          </div>
        </>
      )}
    </div>
  );
};

export default DogSearch;
