import React from "react";
import useTypedSelector from "../../../../../redux/useTypedSelector";
import * as styles from "./PokedexListingPageNavigator.module.scss";
import PokemonButton from "../../../../../components/ui/PokemonButton";
import { useDispatch } from "react-redux";
import {
  setPaginationCurrentPageLimit,
  setPaginationCurrentPageOffset,
} from "../../../../../redux/reducers/paginationReducer";
import { removeAccessToken } from "../../../../../api/auth";
import { navigate } from "gatsby";
import PagePicker from "../../../../../components/ui/PagePicker";

const PokedexListingPageNavigator = () => {
  const dispatch = useDispatch();
  const {
    pokedexReducer: {
      paginationReducer: {
        paginationValues: {
          previousPageLimit,
          previousPageOffset,
          nextPageLimit,
          nextPageOffset,
        },
      },
    },
  } = useTypedSelector();

  const navigatePreviosPage = () => {
    dispatch(setPaginationCurrentPageLimit(previousPageLimit));
    dispatch(setPaginationCurrentPageOffset(previousPageOffset));
  };

  const navigateNextPage = () => {
    dispatch(setPaginationCurrentPageLimit(nextPageLimit));
    dispatch(setPaginationCurrentPageOffset(nextPageOffset));
  };

  const logout = () => {
    removeAccessToken();
    navigate(`/`);
  };

  return (
    <div className={styles.pageNavigatorContainer}>
      <PokemonButton
        className={styles.button}
        name="Logout"
        id="next-button"
        onClick={logout}
      />
      <PokemonButton
        className={styles.button}
        name="<"
        id="previous-button"
        onClick={navigatePreviosPage}
      />
      <PokemonButton
        disabled={nextPageOffset === 0}
        className={styles.button}
        name=">"
        id="next-button"
        onClick={navigateNextPage}
      />
      <PagePicker />
    </div>
  );
};

export default PokedexListingPageNavigator;
