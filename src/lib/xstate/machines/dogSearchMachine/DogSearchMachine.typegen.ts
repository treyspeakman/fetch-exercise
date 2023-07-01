// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.getAllBreedsService": {
      type: "done.invoke.getAllBreedsService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.getAllDogPagesService": {
      type: "done.invoke.getAllDogPagesService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.getAllSearchedDogsService": {
      type: "done.invoke.getAllSearchedDogsService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.getCurrentDogsService": {
      type: "done.invoke.getCurrentDogsService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.getDogIntroService": {
      type: "done.invoke.getDogIntroService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.getFilteredDogPagesService": {
      type: "done.invoke.getFilteredDogPagesService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.getMatchFromChatService": {
      type: "done.invoke.getMatchFromChatService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.getMatchService": {
      type: "done.invoke.getMatchService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.getNextPageService": {
      type: "done.invoke.getNextPageService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.getPreviousPageService": {
      type: "done.invoke.getPreviousPageService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.getResultsFromChatService": {
      type: "done.invoke.getResultsFromChatService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.loginService": {
      type: "done.invoke.loginService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.logoutService": {
      type: "done.invoke.logoutService";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.getAllBreedsService": {
      type: "error.platform.getAllBreedsService";
      data: unknown;
    };
    "error.platform.getAllDogPagesService": {
      type: "error.platform.getAllDogPagesService";
      data: unknown;
    };
    "error.platform.getAllSearchedDogsService": {
      type: "error.platform.getAllSearchedDogsService";
      data: unknown;
    };
    "error.platform.getCurrentDogsService": {
      type: "error.platform.getCurrentDogsService";
      data: unknown;
    };
    "error.platform.getDogIntroService": {
      type: "error.platform.getDogIntroService";
      data: unknown;
    };
    "error.platform.getFilteredDogPagesService": {
      type: "error.platform.getFilteredDogPagesService";
      data: unknown;
    };
    "error.platform.getMatchFromChatService": {
      type: "error.platform.getMatchFromChatService";
      data: unknown;
    };
    "error.platform.getMatchService": {
      type: "error.platform.getMatchService";
      data: unknown;
    };
    "error.platform.getNextPageService": {
      type: "error.platform.getNextPageService";
      data: unknown;
    };
    "error.platform.getPreviousPageService": {
      type: "error.platform.getPreviousPageService";
      data: unknown;
    };
    "error.platform.getResultsFromChatService": {
      type: "error.platform.getResultsFromChatService";
      data: unknown;
    };
    "error.platform.loginService": {
      type: "error.platform.loginService";
      data: unknown;
    };
    "error.platform.logoutService": {
      type: "error.platform.logoutService";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getAllBreedsService: "done.invoke.getAllBreedsService";
    getAllDogPagesService: "done.invoke.getAllDogPagesService";
    getAllSearchedDogsService: "done.invoke.getAllSearchedDogsService";
    getCurrentDogsService: "done.invoke.getCurrentDogsService";
    getDogIntroService: "done.invoke.getDogIntroService";
    getFilteredDogPagesService: "done.invoke.getFilteredDogPagesService";
    getMatchFromChatService: "done.invoke.getMatchFromChatService";
    getMatchService: "done.invoke.getMatchService";
    getNextPageService: "done.invoke.getNextPageService";
    getPreviousPageService: "done.invoke.getPreviousPageService";
    getResultsFromChatService: "done.invoke.getResultsFromChatService";
    loginService: "done.invoke.loginService";
    logoutService: "done.invoke.logoutService";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    addFilter: "NEW_BREED_FILTER";
    clearFilters: "CLEAR_FILTERS";
    logout: "done.invoke.logoutService";
    nextPage: "NEXT_PAGE";
    parseResult: "done.invoke.getResultsFromChatService";
    previousPage: "PREVIOUS_PAGE";
    removeBreedFilter: "REMOVE_BREED_FILTER";
    removeMatch: "REMOVE_MATCH";
    resetAgeFilter: "REMOVE_AGE_FILTER";
    selectPage: "SELECT_PAGE";
    setAllDogPages: "done.invoke.getAllDogPagesService";
    setAuthStatus: "done.invoke.loginService";
    setBreeds: "done.invoke.getAllBreedsService";
    setCurrentDogs: "done.invoke.getCurrentDogsService";
    setDogIntro: "done.invoke.getDogIntroService";
    setMatch:
      | "done.invoke.getMatchFromChatService"
      | "done.invoke.getMatchService";
    setMatchFromCard: "SET_MATCH_FROM_CARD";
    setNewAgeRange: "NEW_AGE_FILTER";
    setNewPage:
      | "done.invoke.getFilteredDogPagesService"
      | "done.invoke.getNextPageService"
      | "done.invoke.getPreviousPageService";
    setNewSortDirection: "NEW_SORT_DIRECTION";
    setNewSortField: "NEW_SORT_FIELD";
    setSearchedDogIdsList: "done.invoke.getAllSearchedDogsService";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    getAllBreedsService:
      | "CLEAR_FILTERS"
      | "NEW_SORT_DIRECTION"
      | "NEW_SORT_FIELD"
      | "done.invoke.loginService";
    getAllDogPagesService:
      | "CLEAR_FILTERS"
      | "NEW_AGE_FILTER"
      | "NEW_SORT_DIRECTION"
      | "NEW_SORT_FIELD"
      | "REMOVE_AGE_FILTER"
      | "REMOVE_BREED_FILTER"
      | "SELECT_PAGE"
      | "done.invoke.loginService";
    getAllSearchedDogsService: "FIND_A_MATCH";
    getCurrentDogsService:
      | "done.invoke.getAllDogPagesService"
      | "done.invoke.getFilteredDogPagesService"
      | "done.invoke.getNextPageService"
      | "done.invoke.getPreviousPageService"
      | "done.state.dogSearch.init";
    getDogIntroService:
      | "SET_MATCH_FROM_CARD"
      | "done.invoke.getMatchFromChatService"
      | "done.invoke.getMatchService";
    getFilteredDogPagesService: "NEW_BREED_FILTER";
    getMatchFromChatService: "done.invoke.getResultsFromChatService";
    getMatchService: "done.invoke.getAllSearchedDogsService";
    getNextPageService: "NEXT_PAGE";
    getPreviousPageService: "PREVIOUS_PAGE";
    getResultsFromChatService: "FIND_MATCH_FROM_CHAT";
    loginService: "LOGIN";
    logoutService: "LOGOUT";
  };
  matchesStates:
    | "findingMatch"
    | "getDogIntro"
    | "gettingAllDogPages"
    | "gettingAllSearchedDogs"
    | "gettingCurrentDogs"
    | "gettingFilteredDogPages"
    | "gettingMatchFromChat"
    | "gettingNextPage"
    | "gettingPreviousPage"
    | "gettingResultsFromChat"
    | "idle"
    | "init"
    | "init.gettingAllBreeds"
    | "init.gettingAllBreeds.failure"
    | "init.gettingAllBreeds.pending"
    | "init.gettingAllBreeds.success"
    | "init.gettingAllDogPages"
    | "init.gettingAllDogPages.failure"
    | "init.gettingAllDogPages.pending"
    | "init.gettingAllDogPages.success"
    | "loggingOut"
    | "login"
    | "promptLogin"
    | {
        init?:
          | "gettingAllBreeds"
          | "gettingAllDogPages"
          | {
              gettingAllBreeds?: "failure" | "pending" | "success";
              gettingAllDogPages?: "failure" | "pending" | "success";
            };
      };
  tags: never;
}
