import clsx from "clsx";
import { useContext, useState } from "react";
import { GlobalStateContext } from "@/lib/contexts/GlobalStateProvider";
import { useActor } from "@xstate/react";
import FilterIconSVG from "public/icons/filter.svg";
import XIcon from "public/icons/x.svg";

import styles from "./filterIcon.module.scss";

const FilterIcon = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.dogSearchService);
  const [hovered, setHovered] = useState<boolean>(false);

  const handleMouseEnter = (clearable: boolean) => {
    if (
      state.context.breedFilters.length > 0 ||
      state.context.ageMin !== undefined
    ) {
      setHovered(true);
    }
  };

  return (
    <div
      onMouseEnter={() =>
        handleMouseEnter(state.context.breedFilters.length > 0)
      }
      onMouseLeave={() => setHovered(false)}
      onClick={() => hovered && send({ type: "CLEAR_FILTERS" })}
      className={clsx(
        styles.filterIconContainer,
        state.context.breedFilters.length > 0 ||
          (state.context.ageMin !== undefined && styles.active)
      )}
    >
      {(state.context.breedFilters.length > 0 ||
        state.context.ageMin !== undefined) && (
        <div className={styles.filterCounter}>
          {hovered ? (
            <XIcon className={styles.xIcon} />
          ) : (
            state.context.breedFilters.length +
            (state.context.ageMin !== undefined ? 1 : 0)
          )}
        </div>
      )}
      <FilterIconSVG className={styles.filterIcon} />
    </div>
  );
};

export default FilterIcon;
