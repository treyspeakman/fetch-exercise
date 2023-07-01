import { getDogAge } from "../utils/helpers/getDogAge";
import { getAgeRange } from "../utils/helpers/getDogAge";
import getDogPages from "../utils/api/getDogPages";
import { trpcClient } from "../utils/trpc/client";
import getMatch from "../utils/api/getMatch";
import getDogsFromIds from "../utils/api/getDogsFromIds";
import getAllBreeds from "../utils/api/getAllBreeds";
import { getNextPage } from "../utils/api/getPage";
import { getPreviousPage } from "../utils/api/getPage";
import { login } from "../utils/api/login";
import { logout } from "../utils/api/logout";

import { DogSearchContext } from "./machines/dogSearchMachine/DogSearchMachine";
import { ChatHistory } from "@/server/routers/chatgpt";
import { Dog } from "./machines/dogSearchMachine/DogSearchMachine";
import { DogPage } from "./machines/dogSearchMachine/DogSearchMachine";
import { Credentials } from "../utils/api/login";

export const logoutService = async () => {
  return await logout();
};

export const loginService = async (credentials: Credentials) => {
  return await login(credentials);
};
export const getMatchFromChatService = async (
  preferredBreed: string,
  preferredAge: string
) => {
  const dogAgeDescription = getDogAge(parseInt(preferredAge));
  const dogAgeRange = getAgeRange(dogAgeDescription);
  const pages = await getDogPages(
    0,
    100,
    "age",
    "ASCENDING",
    [preferredBreed],
    dogAgeRange[0],
    dogAgeRange[1]
  );
  const match = await getMatchService(pages.resultIds);
  return match;
};

export const getResultsFromChatService = async (chat: ChatHistory) => {
  return await trpcClient.chatgpt.getMatch.mutate(chat);
};

export const getDogIntroService = async (match: Dog) => {
  return await trpcClient.chatgpt.getIntro.mutate(match);
};

export const getMatchService = async (
  dogIdList: DogSearchContext["searchedDogIdsList"]
) => {
  const match = await getMatch(dogIdList);
  return match;
};

export const getFilteredDogPagesService = async (
  from: number,
  pageSize: number,
  breedFilters: string[],
  sortBy: DogSearchContext["sortBy"],
  sortDirection: DogSearchContext["sortDirection"],
  ageMin: number,
  ageMax: number
) => {
  const filteredDogs = await getDogPages(
    from,
    pageSize,
    sortBy,
    sortDirection,
    breedFilters,
    ageMin,
    ageMax
  );
  return filteredDogs;
};

export const getAllDogPagesService = async (
  from: number,
  pageSize: number,
  sortBy: DogSearchContext["sortBy"],
  sortDirection: DogSearchContext["sortDirection"],
  breedFilters: string[],
  ageMin: number,
  ageMax: number
) => {
  const allDogs = await getDogPages(
    from,
    pageSize,
    sortBy,
    sortDirection,
    breedFilters,
    ageMin,
    ageMax
  );
  return allDogs;
};

export const getCurrentDogsService = async (dogPage: DogPage) => {
  const dogs = await getDogsFromIds(dogPage.resultIds);
  return dogs;
};

export const getAllBreedsService = async () => {
  const dogs = await getAllBreeds();
  return dogs;
};

export const getNextPageService = async (
  dogPage: DogPage,
  pageSize: number
) => {
  const nextPage = await getNextPage(dogPage, pageSize);
  return nextPage;
};

export const getPreviousPageService = async (
  dogPage: DogPage,
  pageSize: number
) => {
  const previousPage = await getPreviousPage(dogPage, pageSize);
  return previousPage;
};
