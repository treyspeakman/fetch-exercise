import { useContext } from "react";
import capitalizeFirstLetter from "@/lib/utils/helpers/capitalizeFirstLetter";
import {
  dogAgeList,
  getDogAge,
  getAgeRange,
} from "@/lib/utils/helpers/getDogAge";
import { DogSearchContext } from "@/lib/xstate/machines/dogSearchMachine/DogSearchMachine";
import clsx from "clsx";
import DogCard from "../dogCard/DogCard";
import { GlobalStateContext } from "@/lib/contexts/GlobalStateProvider";
import { useActor } from "@xstate/react";
import DropdownItem from "@/core/components/dropdownItem/DropdownItem";
import SortIcon from "public/icons/sort.svg";
import Pagination from "../pagination/Pagination";
import SearchHeader from "../searchHeader/searchHeader";
import Dropdown from "@/core/components/dropdown/Dropdown";
import FilterIcon from "../filterIcon/FilterIcon";
import Button from "@/core/components/button/Button";
import MatchCard from "../matchCard/MatchCard";
import { Rings } from "react-loading-icons";

import styles from "./dogSearch.module.scss";

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
            {state.context.breeds.map((breed, i) => (
              <DropdownItem
                initialSelected={state.context.breedFilters.includes(breed)}
                key={i}
                text={breed}
                onSelect={() => send({ type: "NEW_BREED_FILTER", breed })}
                onRemove={() => send({ type: "REMOVE_BREED_FILTER", breed })}
              ></DropdownItem>
            ))}
          </Dropdown>
          <Dropdown title="Age">
            {dogAgeList.map((ageDescription, i) => (
              <DropdownItem
                initialSelected={
                  state.context.ageMax === getAgeRange(ageDescription)[1]
                }
                key={i}
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
          <Dropdown title={capitalizeFirstLetter(state.context.sortBy)}>
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
      state.matches("gettingAllSearchedDogs") ||
      state.matches("gettingMatchFromChat") ||
      state.matches("gettingResultsFromChat") ? (
        <Rings className={styles.rings} />
      ) : state.context.match.name ? (
        <MatchCard
          messageText={state.context.dogIntro}
          matchedDog={state.context.match}
        />
      ) : (
        <>
          <div className={styles.cardGrid}>
            {state?.context.currentDogs.map((dog, i) => (
              <DogCard
                key={`${dog.name}-${i}`}
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
