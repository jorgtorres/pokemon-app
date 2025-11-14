import React from "react";
import PagePicker from "../PagePicker";
import { renderWithRedux } from "../../../../utils/testHelpers";
import { fireEvent } from "@testing-library/react";

const setup = () => {
  return renderWithRedux(<PagePicker />, {
    initialState: {
      pokedexReducer: {
        paginationReducer: {
          paginationValues: { currentPageLimit: 10 },
        },
      },
    },
  });
};

describe("PagePicker", () => {
  it("PagePicker option picks a selected pokemon per page value", () => {
    const { getByTestId, getByText } = setup();
    expect(getByTestId("page-picker-button")).toHaveTextContent("10");

    fireEvent.click(getByTestId("page-picker-button"));
    expect(getByText("100")).toBeInTheDocument();

    fireEvent.click(getByTestId("page-picker-option-100"));
    expect(getByTestId("page-picker-button")).toHaveTextContent("100");
  });
});
