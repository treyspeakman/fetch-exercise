import getDogPages from "@/lib/utils/api/getDogPages";
import getDogsFromPage from "@/lib/utils/api/getDogsFromPage";
import { DoneInvokeEvent, assign, createMachine } from "xstate";

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
const getFilteredDogPages = async (breedFilters: string[]) => {
  const filteredDogs = await getDogPages(breedFilters);
  return filteredDogs;
};

const getAllDogPages = async () => {
  const allDogs = await getDogPages();
  return allDogs;
};

const getCurrentDogs = async (dogPage: DogPage) => {
  const dogs = await getDogsFromPage(dogPage);
  return dogs;
};
/* ------------------------------ Event Types ------------------------------ */
interface GetFilteredDogPages {
  type: "NEW_BREED_FILTER";
  breed: string;
}

interface GetAllDogs {
  type: "GET_ALL_DOG_PAGES";
}

/* ------------------------------ Schema ------------------------------ */
interface DogSearchContext {
  dogPages: DogPage;
  breedFilters: string[];
  currentDogs: Dog[];
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
      events: {} as GetFilteredDogPages | GetAllDogs,
      services: {} as {
        getFilteredDogPages: {
          data: DogPage;
        };
        getAllDogPages: {
          data: DogPage;
        };
        getCurrentDogs: {
          data: Dog[];
        };
      },
    },
    context: {
      dogPages: {} as DogPage,
      breedFilters: [],
      currentDogs: [],
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          // NEW_BREED_FILTER: {
          //   actions: "addFilter",
          //   target: "gettingFilteredDogPages",
          // },
          GET_ALL_DOG_PAGES: {
            target: "gettingAllDogPages",
          },
        },
      },
      // gettingFilteredDogPages: {
      //   invoke: {
      //     id: "filterBreeds",
      //     src: "filterBreeds",
      //     onDone: {
      //       actions: "",
      //       target: "idle",
      //     },
      //   },
      // },
      gettingAllDogPages: {
        invoke: {
          id: "getAllDogPages",
          src: "getAllDogPages",
          onDone: {
            actions: "setAllDogPages",
            target: "gettingCurrentDogs",
          },
          onError: {},
        },
      },
      gettingCurrentDogs: {
        invoke: {
          id: "getCurrentDogs",
          src: "getCurrentDogs",
          onDone: {
            actions: "setCurrentDogs",
            target: "idle",
          },
        },
      },
    },
  },
  {
    /* ------------------------------ Internal Machine Options ------------------------------ */
    actions: {
      // addFilter: assign({
      //   breedFilters: (context, event) => [
      //     ...context.breedFilters,
      //     event.breed,
      //   ],
      // }),
      setAllDogPages: assign({
        dogPages: (_, event) => event.data,
      }),
      setCurrentDogs: assign({
        currentDogs: (_, event) => event.data,
      }),
    },
    guards: {},
    services: {
      getAllDogPages: async (context) => await getAllDogPages(),
      getCurrentDogs: async (context) => await getCurrentDogs(context.dogPages),
    },
  }
);

export default dogSearchMachine;
