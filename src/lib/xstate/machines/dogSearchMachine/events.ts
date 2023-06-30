import { ChatHistory } from "@/server/routers/chatgpt";
import { Dog } from "./DogSearchMachine";
import { DogSearchContext } from "./DogSearchMachine";
import { Credentials } from "@/lib/utils/api/login";
import { DogAgeDescriptions } from "@/lib/utils/helpers/getDogAge";
/* ------------------------------ Event Types ------------------------------ */
export interface RemoveAgeFilter {
  type: "REMOVE_AGE_FILTER";
  ageDescription: DogAgeDescriptions;
}
export interface RemoveBreedFilter {
  type: "REMOVE_BREED_FILTER";
  breed: string;
}
export interface NewAgeFilter {
  type: "NEW_AGE_FILTER";
  ageArray: number[];
}
export interface Login {
  type: "LOGIN";
  credentials: Credentials;
}
export interface FindMatchFromChat {
  type: "FIND_MATCH_FROM_CHAT";
  chat: ChatHistory;
}
export interface SetMatchFromCard {
  type: "SET_MATCH_FROM_CARD";
  dog: Dog;
}

export interface RemoveMatch {
  type: "REMOVE_MATCH";
}

export interface FindAMatch {
  type: "FIND_A_MATCH";
}

export interface NewSortDirection {
  type: "NEW_SORT_DIRECTION";
  direction: DogSearchContext["sortDirection"];
}

export interface NewSortField {
  type: "NEW_SORT_FIELD";
  field: DogSearchContext["sortBy"];
}
export interface ClearFilters {
  type: "CLEAR_FILTERS";
}

export interface GetFilteredDogPages {
  type: "NEW_BREED_FILTER";
  breed: string;
}

export interface GetAllDogs {
  type: "GET_ALL_DOG_PAGES";
}

export interface GetAllBreeds {
  type: "GET_ALL_BREEDS";
}

export interface NextPage {
  type: "NEXT_PAGE";
}

export interface PreviousPage {
  type: "PREVIOUS_PAGE";
}

export interface SelectPage {
  type: "SELECT_PAGE";
  pageNumber: number;
}
