import React, { useEffect, useMemo } from "react";
import * as styles from "./PokedexListing.module.scss";
import PokemonCard from "../PokemonCard";
import { useBackendSearchPokemons } from "../../../../api/services/backend/hooks/backendHooks";
import Pokemon from "../../../../api/model/backend/Pokemon";
import useTypedSelector from "../../../../redux/useTypedSelector";
import { useDispatch } from "react-redux";
import {
  setPaginationNextPageLimit,
  setPaginationNextPageOffset,
  setPaginationPreviousPageLimit,
  setPaginationPreviousPageOffset,
} from "../../../../redux/reducers/paginationReducer";
import { setCurrentPokemonList } from "../../../../redux/reducers/filterPageReducer";

const PokedexListing = () => {
  const dispatch = useDispatch();
  const {
    pokedexReducer: {
      paginationReducer: {
        paginationValues: { currentPageLimit, currentPageOffset },
      },
    },
  } = useTypedSelector();
  const backendSearchPokemonResponse = useBackendSearchPokemons({
    limit: currentPageLimit,
    offset: currentPageOffset,
  });

  useEffect(() => {
    if (backendSearchPokemonResponse?.data?.next) {
      const params = new URL(backendSearchPokemonResponse?.data?.next)
        .searchParams;
      dispatch(setPaginationNextPageOffset(Number(params.get("offset"))));
      dispatch(setPaginationNextPageLimit(Number(params.get("limit"))));
    }
    if (backendSearchPokemonResponse?.data?.previous) {
      const params = new URL(backendSearchPokemonResponse?.data?.previous)
        .searchParams;
      dispatch(setPaginationPreviousPageOffset(Number(params.get("offset"))));
      dispatch(setPaginationPreviousPageLimit(Number(params.get("limit"))));
    }
  }, [backendSearchPokemonResponse.isFetching]);

  useEffect(() => {
    backendSearchPokemonResponse?.refetch();
  }, [currentPageLimit, currentPageOffset]);

  const {
    pokedexReducer: {
      filterPageReducer: {
        filterPageValues: { sortValue, textSearchValue },
      },
    },
  } = useTypedSelector();

  const filteredPokemonResponse = useMemo(() => {
    let filteredDataArray: Pokemon[] = [];
    if (textSearchValue?.length) {
      filteredDataArray =
        backendSearchPokemonResponse.data?.results?.filter((pokemon) =>
          pokemon.name.startsWith(textSearchValue)
        ) ?? [];
    } else {
      filteredDataArray = backendSearchPokemonResponse.data?.results ?? [];
    }
    filteredDataArray = filteredDataArray.map((p) => ({
      ...p,
      id: Number(new URL(p.url).pathname.replace(/\/$/, "").split("/").pop()),
    }));

    if (sortValue) {
      if (sortValue === "name") {
        filteredDataArray = filteredDataArray.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (sortValue === "number") {
        filteredDataArray = filteredDataArray.sort((a, b) => {
          return a.id - b.id;
        });
      }
    }
    dispatch(setCurrentPokemonList(filteredDataArray));

    return filteredDataArray;
  }, [textSearchValue, sortValue, backendSearchPokemonResponse.isFetching]);

  return (
    <div className={styles.listingContainer}>
      <div className={styles.listingContent}>
        {filteredPokemonResponse?.map((pokemon, idx) => (
          <PokemonCard key={idx} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};
export default PokedexListing;
