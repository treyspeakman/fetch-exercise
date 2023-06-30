import { FC, createContext } from "react";
import { useInterpret } from "@xstate/react";
import dogSearchMachine from "../xstate/machines/dogSearchMachine/DogSearchMachine";
import { InterpreterFrom } from "xstate";

export const GlobalStateContext = createContext({
  dogSearchService: {} as InterpreterFrom<typeof dogSearchMachine>,
});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: FC<Props> = ({ children }) => {
  const dogSearchService = useInterpret(dogSearchMachine, { devTools: true });

  return (
    <GlobalStateContext.Provider value={{ dogSearchService }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
