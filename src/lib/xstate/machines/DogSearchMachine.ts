import getDogPages from "@/lib/utils/api/getDogPages";
import getDogsFromIds from "@/lib/utils/api/getDogsFromIds";
import { assign, createMachine } from "xstate";
import { getNextPage, getPreviousPage } from "@/lib/utils/api/getPage";
import getAllBreeds from "@/lib/utils/api/getAllBreeds";
import getMatch from "@/lib/utils/api/getMatch";

export interface DogPage {
  resultIds: string[];
  total: number;
  next: string;
  prev: string;
}

export interface Dog {
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

/* ------------------------------ Helpers------------------------------ */
const getMatchService = async (
  dogIdList: DogSearchContext["searchedDogIdsList"]
) => {
  const match = await getMatch(dogIdList);
  return match;
};
const getFilteredDogPagesService = async (
  from: number,
  pageSize: number,
  breedFilters: string[],
  sortBy: DogSearchContext["sortBy"],
  sortDirection: DogSearchContext["sortDirection"]
) => {
  const filteredDogs = await getDogPages(
    from,
    pageSize,
    breedFilters,
    sortBy,
    sortDirection
  );
  return filteredDogs;
};

const getAllDogPagesService = async (
  from: number,
  pageSize: number,
  breedFilters: string[],
  sortBy: DogSearchContext["sortBy"],
  sortDirection: DogSearchContext["sortDirection"]
) => {
  const allDogs = await getDogPages(
    from,
    pageSize,
    breedFilters,
    sortBy,
    sortDirection
  );
  return allDogs;
};

const getCurrentDogsService = async (dogPage: DogPage) => {
  const dogs = await getDogsFromIds(dogPage.resultIds);
  return dogs;
};

const getAllBreedsService = async () => {
  const dogs = await getAllBreeds();
  return dogs;
};

const getNextPageService = async (dogPage: DogPage, pageSize: number) => {
  const nextPage = await getNextPage(dogPage, pageSize);
  return nextPage;
};

const getPreviousPageService = async (dogPage: DogPage, pageSize: number) => {
  const previousPage = await getPreviousPage(dogPage, pageSize);
  return previousPage;
};
/* ------------------------------ Event Types ------------------------------ */
interface FindAMatch {
  type: "FIND_A_MATCH";
}
interface NewSortDirection {
  type: "NEW_SORT_DIRECTION";
  direction: DogSearchContext["sortDirection"];
}
interface NewSortField {
  type: "NEW_SORT_FIELD";
  field: DogSearchContext["sortBy"];
}
interface ClearFilters {
  type: "CLEAR_FILTERS";
}

interface GetFilteredDogPages {
  type: "NEW_BREED_FILTER";
  breed: string;
}

interface GetAllDogs {
  type: "GET_ALL_DOG_PAGES";
}

interface GetAllBreeds {
  type: "GET_ALL_BREEDS";
}

interface NextPage {
  type: "NEXT_PAGE";
}

interface PreviousPage {
  type: "PREVIOUS_PAGE";
}

interface SelectPage {
  type: "SELECT_PAGE";
  pageNumber: number;
}

/* ------------------------------ Schema ------------------------------ */
export interface DogSearchContext {
  dogPages: DogPage;
  breedFilters: string[];
  currentDogs: Dog[];
  pageSize: number;
  cursor: number;
  breeds: string[];
  sortBy: "breed" | "age" | "name";
  sortDirection: "ASCENDING" | "DESCENDING";
  searchedDogIdsList: string[];
  match: Dog;
}

// type TripBrainyEvents = NewUserMessageType | ExtractionCompleteEvent;

const dogSearchMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBLADgIVQQ3QDsBPAYgDkBRAdQH0BVAZUoCVaBZSxxgQQHFKAbQAMAXUShMAe1jpk6KYQkgAHogBM6gJwBGAHTqAbAFYtWgOzqAzJpMAWADQhiiHVeF6thgBznvw4x1zYz8ddQBfcKc0LFwCEj0AYwALMESAax4AV2RUwnlEvHlFUghFMD0iADcpdIqUtMycvIKihUIRcSQQaVlipW61BABaHTc9b3VjYUMgqzstbzt1cycXBGNvLT0dY1nNK0N1NynI6IwcfCJiJNSM7NywfPRC-tIwVFQpVD1MABsigAzb4AW1ujQeLRebUUnWUvTk7WUQz2xj0VnMdm8Wzshy2wlWzlcm08dkM5is3lmxjJhgJZxAMUu8RuDQyAGFkkV2VIsvlSuVKoQanVwRyucgeXzkHDugj+sjEHYyXphFYwuZzDoZnYQiY1q47MJthjNiFAlphJpzAymXFrmL0pzubz+R8vj9-kDQY7nZLXTKxPCZIjFIqEMrDHpzDNtH5pl4dN4DQg3DoozjcXYdHYKVNjLaLvaElBUGAwMhIU9WshIPRYB9SLLJCGFYMNMJc6rcZbI5rgsYUzn5npcd4bFqrFYLEtC7Ergl0BA-mAKDQGMw2JxuPwhEG5a2ke2ENPxp2sajtVoaUOCWiaTmguTdIZDHY58yHUREmWQdWiFAfpSvyZSEBU1S1OBhA-mAf75EBAbNj0h5hseKyWOiRx7GqVjGDY3iDkSqZauY0Y+DS15jJaBZRIyRYLjc36-v+hCARKwHIO8nzfL8ALIMCqBgkxsHVgh0pIfKR6gEMKwEQYPhaNYr7HJ2hHrOoxrqHodLUjYWK6DatF2gxSTfGWiTyKx9YfOwcCwHgMACmBQoivUZlpMg1moLZsD2TAEkoQM0muMa+gBMInbjmExgxVoQ4xnYBi6Nm2i6LsikfsWrLuRZAFeT5fmru6PFevxPqJDlnkNt5dkOWAAV9FJqghboqrTJF6r5qYQ5UlppiHMYRheHSWhWJlJllrA0iEBAAFOVBrl6DAkoSnwAAKAAqLBwNNDYNaGQXNamRiJWYZiUl4WJjimexRns6i0rhwhhEE40snok3TbNrFcR6vHeoJS0Vn661bTtih7fuLaNahwUbIS6nWB4uruH4BEEpShhvQ6YAqGgeC5axAAyUivO0sDzXosDIEUFTGe9uP44TUAk2TEP7W2cPHOY2yLLs+GLPMjhEVSUbatO8zBAReHvkZ9EM3j+DM6zMKEBToEVNTtN6PTOOKwTlks6TquwIIOhdNDB3htzvPePz6hbOOyq3mY2nKoEbg4T4hnnPOCtM4bKv9LAlTLquHNNTJxrRr4uZjCEmjUSmVK86aieqU+2MJIzSuB8bwehyuTbm8GMOHVH2x+JiWq7JY2gBLedLokaua4fX5gmFnNw5wbAFB+Teh-Pn7TYOgeDq4KEGij3Fn94oo-jxHsNHUs+i6A9RpJuSyw6Mn14GGqMxozoXinHLft6wHffDxDg834QC8T85U8VDPyBzw-Y+myXB5l+Gq+eDCMqZ6VJMTHGTl2PwPYtALBsDMLQXc9Bv2vmzNWd9UGP1+iVPiAkwRvw-o-Je5dEAAPXsAreYDd5ETGH4CYoUtgUQ0t4RByDib3xDuZKQII4IQBNpTF+SD9YWW2hVbhTxeHByIeGdMI5hB2zwgRXMD0pzJ01GRGk6EFhxhYUIvOqCOFpC4TwvhxVPQ4J9G-ERRjxEmykceGRiU5H80UZYXEVgUwWA8BiJMcdT42EQUPPA30oDsDwJgO+QS+BSCkFAFca0ASJDgPw4UkEgbICiTEuJCS4B2K5tiNEfNNQYhsIEXEHiAgGFzEcN8PNlQIPPp+BIgTgmhPCc0jJsSwDxIJkkjWLlUnLQ6Vknp38LbIT-mhfJng7ZFLzKU9xRE-BRhMJSQIU47bWGYQ0rKESWlhN2UMrp2SKamP+mVQGgzomdO6Yk02UNxlW0mXJQpFI5nDhTBSbY1gPadhOFsepvtGk3GaQBVpS0rnDNuSTIJkAmz3MksvIYuFsSqhsA9PCMUYyGA8RpPQpgYomDcCEfwOhIi0UIFICAcBlC6xIKXR5cNhhorxWdHMMUCQbLUogYY3hVRhBMBRLCWJO7bJMmyJojxnioPpZzI6ow4rUIes3XCZgnGUiTDRQFOzxViXyDKyO3KT6jmimSbUwRqJlOoSlCY2p0wMPSpquiF8EhoEwIkSg3FUD6sRSQgkngfBvjcDzW6Cr1hpjRIcN86oxjkkmIg0s5ZKzNH-K8Os1VvXEIQP4XlXgqQ0l8JoaYCyw3Wrts9BSgRTC5kQWWAAjlkOASbJU1iagizN2olX+AiliSYnKUzKjCgsXw5JvYJyxqK96eBk1StVh6j0GbwzDBWIlUwZg2XTFCFMFMDtkZ7C3heRS9hEFLhXAu48eIrDdixDIu2hhi0hWCKqB2+JKQRUWFsrVJlhJwUNrq5AZ64aHAim1Ckyx-mWDcEOckl7fC7GWDvDE47P3vW-aJdiAY53fAA0dJGl7ph3t0F2rU15t2hVVH4CKNhimWB9k6oFplPgeTytVAqdVsMyV2PoKYb4Vhb2OOoeKGIJjzBPifNKSxHW0puJ9RQwT2OGhMJ4WMixsy6g3UOKt0ZaTTDJBoiIE6HRQEwMgAAYgQP4WQyzyZPM9VFmJpyKSNNOO926RPonyeOFxHd9PIcvrnFBJtrPTg+dHCk0VBpGgsGNAz2ddEBYLiesA1nfCqJXRshYuonO4h0VfNh+j0Gq0ftZ2kbszrczfGqS16wlhpbCA7XUAQNKy187F3LRt8ucLETNQLv8GVHTCJSHYMxpyxxMIYUaydxzaVGvYRYWprCkpi93OLeWTaCKvooMz6ALNWd67KoYJ9gOjU1NoJr14zAeI7nihhUwphTgdj5ujOzWHtbW8gxQjAsiJFubAQEWQ-jWcOx4Y7lhFKdnO6GkhixVRLBsM+a8ywAVPZMiC1irTrMPUfRFNUMZzu4i3UREwHg8InxsGDtU42AlSCCaC-Z7SIVHJGRjwal7scYmNFWkpk39B2ynI1jSnjosteBdTvZ4SoAM5uXAaFVKIBBclgYPYZg8LPWmJoDxRq9iYjWYpFYeEqc07R-siXmTGe3Mw16vbBqTwK+48r9wuwrQCcWYNjS43NhaMtG4Ml4QgA */
    /* ------------------------------ Machine Config ------------------------------ */

    id: "dogSearch",
    predictableActionArguments: true,
    tsTypes: {} as import("./DogSearchMachine.typegen").Typegen0,
    schema: {
      /* ------------------------------ Machine Schema ------------------------------ */
      context: {} as DogSearchContext,
      events: {} as
        | GetFilteredDogPages
        | GetAllDogs
        | NextPage
        | PreviousPage
        | SelectPage
        | GetAllBreeds
        | ClearFilters
        | NewSortField
        | NewSortDirection
        | FindAMatch,

      services: {} as {
        getMatchService: {
          data: Dog;
        };
        getAllSearchedDogsService: {
          data: DogPage;
        };
        getFilteredDogPagesService: {
          data: DogPage;
        };
        getAllDogPagesService: {
          data: DogPage;
        };
        getCurrentDogsService: {
          data: Dog[];
        };
        getNextPageService: {
          data: DogPage;
        };
        getPreviousPageService: {
          data: DogPage;
        };
        getAllBreedsService: {
          data: string[];
        };
      },
    },
    context: {
      dogPages: {} as DogPage,
      breedFilters: [],
      currentDogs: [],
      pageSize: 25,
      cursor: 0,
      breeds: [],
      sortBy: "breed",
      sortDirection: "ASCENDING",
      searchedDogIdsList: [],
      match: {} as Dog,
    },
    initial: "init",
    states: {
      init: {
        onDone: { target: "gettingCurrentDogs" },
        type: "parallel",
        states: {
          gettingAllDogPages: {
            initial: "pending",
            states: {
              pending: {
                invoke: {
                  id: "getAllDogPagesService",
                  src: "getAllDogPagesService",
                  onDone: {
                    actions: "setAllDogPages",
                    target: "success",
                  },
                  onError: {},
                },
              },
              success: {
                type: "final",
              },
              failure: {},
            },
          },
          gettingAllBreeds: {
            initial: "pending",
            states: {
              pending: {
                invoke: {
                  id: "getAllBreedsService",
                  src: "getAllBreedsService",
                  onDone: {
                    actions: "setBreeds",
                    target: "success",
                  },
                  onError: {
                    target: "failure",
                  },
                },
              },
              success: { type: "final" },
              failure: {},
            },
          },
        },
      },

      idle: {
        on: {
          FIND_A_MATCH: {
            target: "gettingAllSearchedDogs",
          },
          NEW_SORT_DIRECTION: {
            actions: "setNewSortDirection",
            target: "init.gettingAllDogPages",
          },
          NEW_SORT_FIELD: {
            actions: "setNewSortField",
            target: "init.gettingAllDogPages",
          },
          CLEAR_FILTERS: {
            actions: "clearFilters",
            target: "init.gettingAllDogPages",
          },
          NEW_BREED_FILTER: {
            actions: "addFilter",
            target: "gettingFilteredDogPages",
          },
          NEXT_PAGE: {
            actions: "nextPage",
            target: "gettingNextPage",
          },
          PREVIOUS_PAGE: {
            actions: "previousPage",
            target: "gettingPreviousPage",
          },
          SELECT_PAGE: {
            actions: "selectPage",
            target: "gettingAllDogPages",
          },
        },
      },
      gettingAllSearchedDogs: {
        invoke: {
          id: "getAllSearchedDogsService",
          src: "getAllSearchedDogsService",
          onDone: {
            actions: "setSearchedDogIdsList",
            target: "findingMatch",
          },
        },
      },
      findingMatch: {
        invoke: {
          id: "getMatchService",
          src: "getMatchService",
          onDone: {
            actions: "setMatch",
          },
        },
      },
      gettingFilteredDogPages: {
        invoke: {
          id: "getFilteredDogPagesService",
          src: "getFilteredDogPagesService",
          onDone: {
            actions: "setNewPage",
            target: "gettingCurrentDogs",
          },
        },
      },
      gettingAllDogPages: {
        invoke: {
          id: "getAllDogPagesService",
          src: "getAllDogPagesService",
          onDone: {
            actions: "setAllDogPages",
            target: "gettingCurrentDogs",
          },
          onError: {},
        },
      },
      gettingCurrentDogs: {
        invoke: {
          id: "getCurrentDogsService",
          src: "getCurrentDogsService",
          onDone: {
            actions: "setCurrentDogs",
            target: "idle",
          },
          onError: {},
        },
      },
      gettingNextPage: {
        invoke: {
          id: "getNextPageService",
          src: "getNextPageService",
          onDone: {
            actions: "setNewPage",
            target: "gettingCurrentDogs",
          },
          onError: {
            target: "idle",
          },
        },
      },
      gettingPreviousPage: {
        invoke: {
          id: "getPreviousPageService",
          src: "getPreviousPageService",
          onDone: {
            actions: "setNewPage",
            target: "gettingCurrentDogs",
          },
          onError: {
            target: "idle",
          },
        },
      },
      // gettingAllBreeds: {
      //   invoke: {
      //     id: "getAllBreedsService",
      //     src: "getAllBreedsService",
      //     onDone: {
      //       actions: "setBreeds",
      //       target: "idle",
      //     },
      //     onError: {
      //       target: "idle",
      //     },
      //   },
      // },
    },
  },
  {
    /* ------------------------------ Internal Machine Options ------------------------------ */
    actions: {
      setMatch: assign({
        match: (_, event) => event.data,
      }),
      setSearchedDogIdsList: assign({
        searchedDogIdsList: (_, event) => event.data.resultIds,
      }),
      setNewSortDirection: assign({
        sortDirection: (_, event) => event.direction,
      }),
      setNewSortField: assign({
        sortBy: (_, event) => event.field,
      }),
      clearFilters: assign({
        breedFilters: () => [],
      }),
      addFilter: assign({
        breedFilters: (context, event) => [
          ...context.breedFilters,
          event.breed,
        ],
      }),
      setAllDogPages: assign({
        dogPages: (_, event) => event.data,
      }),
      setCurrentDogs: assign({
        currentDogs: (_, event) => event.data,
      }),
      nextPage: assign({
        cursor: (context, _) => context.cursor + context.pageSize,
      }),
      previousPage: assign({
        cursor: (context, _) => context.cursor - context.pageSize,
      }),
      setNewPage: assign({
        dogPages: (_, event) => event.data,
      }),
      selectPage: assign({
        cursor: (context, event) => context.pageSize * event.pageNumber - 25,
      }),
      setBreeds: assign({
        breeds: (_, event) => event.data,
      }),
    },
    guards: {},
    services: {
      getMatchService: async (context) =>
        getMatchService(context.searchedDogIdsList),
      getAllSearchedDogsService: async (context) =>
        await getAllDogPagesService(
          0,
          context.dogPages.total,
          context.breedFilters,
          context.sortBy,
          context.sortDirection
        ),
      getAllDogPagesService: async (context) =>
        await getAllDogPagesService(
          context.cursor,
          context.pageSize,
          context.breedFilters,
          context.sortBy,
          context.sortDirection
        ),
      getCurrentDogsService: async (context) =>
        await getCurrentDogsService(context.dogPages),
      getNextPageService: async (context) =>
        await getNextPageService(context.dogPages, context.pageSize),
      getPreviousPageService: async (context) =>
        await getPreviousPageService(context.dogPages, context.pageSize),
      getAllBreedsService: async () => await getAllBreedsService(),
      getFilteredDogPagesService: async (context) =>
        await getFilteredDogPagesService(
          0,
          context.pageSize,
          context.breedFilters,
          context.sortBy,
          context.sortDirection
        ),
    },
  }
);

export default dogSearchMachine;
