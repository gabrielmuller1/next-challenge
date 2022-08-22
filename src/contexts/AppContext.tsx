import React, { createContext, useReducer } from "react";
import { PagesEnum } from "../model";

type State = {
  currentPage: PagesEnum | undefined;
};

enum ActionTypes {
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
}

type Action = {
  type: ActionTypes.SET_CURRENT_PAGE;
  page: PagesEnum;
};

const initialState: State = {
  currentPage: undefined,
};

const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const { Provider } = AppContext;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    default:
      throw new Error(`AppContext: Action not found`);
  }
};

type Props = {
  children: React.ReactNode;
};

const AppProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { AppContext, AppProvider, ActionTypes };
