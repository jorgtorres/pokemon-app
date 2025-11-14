import React from "react";
import { createStore } from "redux";
import rootReducer from "../redux/reducers";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import PokemonQueryClientProvider from "../components/react-query/PokemonQueryClientProvider";

export const renderWithRedux = (
  ui: React.ReactElement,
  { initialState = {}, store = createStore(rootReducer, initialState) } = {}
) => {
  // console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
  return {
    ...render(
      <Provider store={store}>
        <PokemonQueryClientProvider>{ui}</PokemonQueryClientProvider>
      </Provider>,
      {}
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
};
