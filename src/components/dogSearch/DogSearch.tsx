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

const sortItems: DogSearchContext["sortBy"][] = [
  "breed",
  "age",
  "zip_code",
  "name",
];

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
        <SearchHeader
          renderIcon={() => (
            <SortIcon
              className={clsx(
                styles.sortIcon,
                state.context.sortDirection == "DESCENDING" && styles.descending
              )}
            />
          )}
        >
          <Dropdown title={state.context.sortBy}>
            {sortItems
              .filter((field) => field !== state.context.sortBy) // Exclude the current sortBy value
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

      <div className={styles.filterContainer}></div>
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
    </div>
  );
};

export default DogSearch;
