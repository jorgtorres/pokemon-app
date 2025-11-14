import { combineReducers } from "redux";
import paginationReducer from "./paginationReducer";
import filterPageReducer from "./filterPageReducer";

const pokedexReducer = combineReducers({
  paginationReducer,
  filterPageReducer,
});

const combinedReducers = combineReducers({ pokedexReducer });

export default combinedReducers;
