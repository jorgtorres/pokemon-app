import { createSlice } from "@reduxjs/toolkit";

type initialStateTyped = {
  paginationValues: {
    currentPageOffset: number;
    currentPageLimit: number;
    nextPageOffset: number;
    nextPageLimit: number;
    previousPageOffset: number;
    previousPageLimit: number;
  };
};

export const initialState: initialStateTyped = {
  paginationValues: {
    currentPageOffset: 0,
    currentPageLimit: 50,
    nextPageLimit: 0,
    nextPageOffset: 0,
    previousPageOffset: 0,
    previousPageLimit: 0,
  },
};

const paginationReducer = createSlice({
  name: "Pagination Reducer",
  initialState,
  reducers: {
    setPaginationCurrentPageOffset: (state, action) => {
      state.paginationValues = {
        ...state.paginationValues,
        currentPageOffset: action.payload,
      };
    },
    setPaginationCurrentPageLimit: (state, action) => {
      state.paginationValues = {
        ...state.paginationValues,
        currentPageLimit: action.payload,
      };
    },
    setPaginationNextPageOffset: (state, action) => {
      state.paginationValues = {
        ...state.paginationValues,
        nextPageOffset: action.payload,
      };
    },
    setPaginationNextPageLimit: (state, action) => {
      state.paginationValues = {
        ...state.paginationValues,
        nextPageLimit: action.payload,
      };
    },
    setPaginationPreviousPageOffset: (state, action) => {
      state.paginationValues = {
        ...state.paginationValues,
        previousPageOffset: action.payload,
      };
    },
    setPaginationPreviousPageLimit: (state, action) => {
      state.paginationValues = {
        ...state.paginationValues,
        previousPageLimit: action.payload,
      };
    },
  },
});

export const {
  setPaginationCurrentPageOffset,
  setPaginationCurrentPageLimit,
  setPaginationNextPageOffset,
  setPaginationNextPageLimit,
  setPaginationPreviousPageOffset,
  setPaginationPreviousPageLimit,
} = paginationReducer.actions;
export default paginationReducer.reducer;
