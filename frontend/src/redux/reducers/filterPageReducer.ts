import { createSlice } from "@reduxjs/toolkit";
import { SortType } from "../../components/ui/SortButton/SortButton";
import Pokemon from "../../api/model/backend/Pokemon";

type initialStateTyped = {
  filterPageValues: {
    textSearchValue: string;
    sortValue: SortType;
    currentPokemonList: Pokemon[];
  };
};

export const initialState: initialStateTyped = {
  filterPageValues: {
    textSearchValue: "",
    sortValue: "",
    currentPokemonList: [],
  },
};

const filterPageReducer = createSlice({
  name: "Filter Page Reducer",
  initialState,
  reducers: {
    setTextSearchValue: (state, action) => {
      state.filterPageValues = {
        ...state.filterPageValues,
        textSearchValue: action.payload,
      };
    },
    setSortValue: (state, action) => {
      state.filterPageValues = {
        ...state.filterPageValues,
        sortValue: action.payload,
      };
    },
    setCurrentPokemonList: (state, action) => {
      state.filterPageValues = {
        ...state.filterPageValues,
        currentPokemonList: action.payload,
      };
    },
  },
});

export const { setTextSearchValue, setSortValue, setCurrentPokemonList } =
  filterPageReducer.actions;
export default filterPageReducer.reducer;
