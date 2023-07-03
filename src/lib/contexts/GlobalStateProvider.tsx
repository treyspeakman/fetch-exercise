import { FC, createContext } from "react";
import { useInterpret } from "@xstate/react";
import dogSearchMachine from "../xstate/machines/DogSearchMachine";
import { InterpreterFrom } from "xstate";

export const GlobalStateContext = createContext({
  dogSearchService: {} as InterpreterFrom<typeof dogSearchMachine>,
});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: FC<Props> = ({ children }) => {
  const dogSearchService = useInterpret(dogSearchMachine, {
    devTools: process.env.NODE_ENV == "development" ? true : false,
  });

  return (
    <GlobalStateContext.Provider value={{ dogSearchService }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
