import { useContext, useEffect, useState } from "react";
import { getDogAge } from "@/lib/utils/helpers/getDogAge";
import { DogSearchContext } from "@/lib/xstate/machines/dogSearchMachine/DogSearchMachine";
import { getAgeRange } from "@/lib/utils/helpers/getDogAge";
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
import { dogAgeList } from "@/lib/utils/helpers/getDogAge";
import { Rings } from "react-loading-icons";

const sortItems: DogSearchContext["sortBy"][] = ["breed", "age", "name"];

const DogSearch = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.dogSearchService);

  return (
    <div className={styles.dogSearch}>
      <div className={styles.searchHeader}>
        <SearchHeader
          className={styles.filterDetails}
          renderIcon={() => <FilterIcon />}
        >
          <Dropdown title="Breed">
            {state.context.breeds.map((breed) => (
              <DropdownItem
                text={breed}
                onSelect={() => send({ type: "NEW_BREED_FILTER", breed })}
                onRemove={() => send({ type: "REMOVE_BREED_FILTER", breed })}
              ></DropdownItem>
            ))}
          </Dropdown>
          <Dropdown title="Age">
            {dogAgeList.map((ageDescription) => (
              <DropdownItem
                text={ageDescription}
                exclusiveSelection={{
                  applied: true,
                  value:
                    state.context.ageMax !== undefined &&
                    getDogAge(state.context.ageMax),
                }}
                onSelect={() =>
                  send({
                    type: "NEW_AGE_FILTER",
                    ageArray: getAgeRange(ageDescription),
                  })
                }
                onRemove={() =>
                  send({ type: "REMOVE_AGE_FILTER", ageDescription })
                }
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
          className={styles.sortDetails}
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

      {state.matches("findingMatch") ||
      state.matches("gettingAllSearchedDogs") ? (
        <Rings className={styles.rings} />
      ) : state.context.match.name ? (
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
