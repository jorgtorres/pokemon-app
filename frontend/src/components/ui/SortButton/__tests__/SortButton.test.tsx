import React from "react";
import { renderWithRedux } from "../../../../utils/testHelpers";
import SortButton from "../SortButton";
import SortPlaceholderIcon from "../../../assets/sortByName.svg";
import { fireEvent } from "@testing-library/react";

const setup = () => {
  return renderWithRedux(<SortButton />, {
    initialState: {
      pokedexReducer: {
        filterPageReducer: {
          filterPageValues: { sortValue: "" },
        },
      },
    },
  });
};

describe("SortButton", () => {
  it("SortButton option picks a selected sort value between 'Name' and 'Number'", () => {
    const { store, getByTestId, getByText } = setup();

    expect(
      store.getState().pokedexReducer.filterPageReducer.filterPageValues
        .sortValue
    ).toBe("");

    fireEvent.click(getByTestId("sort-button"));
    expect(getByText("Name")).toBeInTheDocument();

    fireEvent.click(getByTestId("sort-option-name"));
    expect(
      store.getState().pokedexReducer.filterPageReducer.filterPageValues
        .sortValue
    ).toBe("name");

    fireEvent.click(getByTestId("sort-button"));
    expect(getByText("Number")).toBeInTheDocument();

    fireEvent.click(getByTestId("sort-option-number"));
    expect(
      store.getState().pokedexReducer.filterPageReducer.filterPageValues
        .sortValue
    ).toBe("number");
  });
});
