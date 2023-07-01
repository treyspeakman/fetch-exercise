import clsx from "clsx";
import PreviousIcon from "public/icons/chevron-left.svg";
import NextIcon from "public/icons/chevron-right.svg";
import FirstIcon from "public/icons/chevrons-left.svg";
import LastIcon from "public/icons/chevrons-right.svg";
import {
  calculateCurrentPage,
  createNumberArray,
} from "@/lib/utils/helpers/pagination";
import { GlobalStateContext } from "@/lib/contexts/GlobalStateProvider";
import { useActor } from "@xstate/react";
import { useContext, useEffect, useState } from "react";

import styles from "./pagination.module.scss";

const Pagination = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.dogSearchService);
  const [pageNumbers, setPageNumbers] = useState<number[]>([1, 2, 3, 4, 5]);
  const [currentPage, setCurrentPage] = useState<number>();
  const [finalPage, setFinalPage] = useState<number>(
    Math.ceil(state.context.dogPages.total / state.context.pageSize)
  );

  const hasPreviousPage = () => !!state.context.dogPages.prev;
  const hasNextPage = () =>
    state.context.cursor + state.context.pageSize <
      state.context.dogPages.total && styles.available;

  useEffect(() => {
    const currentPage = calculateCurrentPage(
      state.context.pageSize,
      state.context.cursor
    );
    setCurrentPage(currentPage);

    if (currentPage > 3) {
      setPageNumbers(createNumberArray(currentPage, finalPage));
    } else {
      setPageNumbers([1, 2, 3, 4, 5].filter((value) => value <= finalPage));
    }
  });

  useEffect(() => {
    setFinalPage(
      Math.ceil(state.context.dogPages.total / state.context.pageSize)
    );
  }, [state.context.dogPages.total]);

  return (
    <div className={styles.pagination}>
      <FirstIcon
        onClick={() =>
          hasPreviousPage() && send({ type: "SELECT_PAGE", pageNumber: 1 })
        }
        className={clsx(
          styles.icon,
          state.context.dogPages.prev && styles.available
        )}
      />
      <PreviousIcon
        onClick={() => hasPreviousPage() && send({ type: "PREVIOUS_PAGE" })}
        className={clsx(
          styles.icon,
          state.context.dogPages.prev && styles.available
        )}
      />
      <div className={styles.pageNumberList}>
        {pageNumbers.map((pageNumber, i) => (
          <span
            key={i}
            onClick={() => send({ type: "SELECT_PAGE", pageNumber })}
            className={clsx(
              styles.pageNumberContainer,
              pageNumber == currentPage && styles.currentPage
            )}
          >
            <span
              className={clsx(
                styles.pageNumber,
                pageNumber == currentPage && styles.currentPage
              )}
            >
              {pageNumber}
            </span>
          </span>
        ))}
      </div>
      <NextIcon
        onClick={() => hasNextPage() && send({ type: "NEXT_PAGE" })}
        className={clsx(
          styles.icon,
          state.context.cursor + state.context.pageSize <
            state.context.dogPages.total && styles.available
        )}
      />
      <LastIcon
        onClick={() =>
          hasNextPage() && send({ type: "SELECT_PAGE", pageNumber: finalPage })
        }
        className={clsx(
          styles.icon,
          state.context.cursor + state.context.pageSize <
            state.context.dogPages.total && styles.available
        )}
      />
    </div>
  );
};

export default Pagination;
