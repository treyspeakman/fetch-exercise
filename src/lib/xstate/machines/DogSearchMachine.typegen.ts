// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.getAllDogPages": {
      type: "done.invoke.getAllDogPages";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.getCurrentDogs": {
      type: "done.invoke.getCurrentDogs";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.getAllDogPages": {
      type: "error.platform.getAllDogPages";
      data: unknown;
    };
    "error.platform.getCurrentDogs": {
      type: "error.platform.getCurrentDogs";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getAllDogPages: "done.invoke.getAllDogPages";
    getCurrentDogs: "done.invoke.getCurrentDogs";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    setAllDogPages: "done.invoke.getAllDogPages";
    setCurrentDogs: "done.invoke.getCurrentDogs";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    getAllDogPages: "GET_ALL_DOG_PAGES";
    getCurrentDogs: "done.invoke.getAllDogPages";
  };
  matchesStates: "gettingAllDogPages" | "gettingCurrentDogs" | "idle";
  tags: never;
}
