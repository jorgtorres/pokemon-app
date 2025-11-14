import React, { useEffect, useMemo } from "react";
import * as styles from "./PokedexListing.module.scss";
import PokemonCard from "../PokemonCard";
import { useBackendSearchPokemons } from "../../../../api/services/backend/hooks/backendHooks";
import Pokemon from "../../../../api/model/backend/Pokemon";

interface PokedexListingProps {
  search: string;
  sort: string;
}

const PokedexListing = ({ search, sort }: PokedexListingProps) => {
  const backendSearchPokemonResponse = useBackendSearchPokemons({});

  const parsedResponse = useMemo(() => {
    let parsedArray: Pokemon[] = [];
    if (search?.length) {
      parsedArray =
        backendSearchPokemonResponse.data?.results?.filter((pokemon) =>
          pokemon.name.startsWith(search)
        ) ?? [];
    } else {
      parsedArray = backendSearchPokemonResponse.data?.results ?? [];
    }

    if (sort?.length) {
      if (sort === "name") {
        parsedArray = parsedArray.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === "number") {
      }
    }

    return parsedArray;
  }, [search, sort, backendSearchPokemonResponse.data]);

  return (
    <div className={styles.listingContainer}>
      {parsedResponse?.map((pokemon) => (
        <PokemonCard pokemon={pokemon} />
      ))}
    </div>
  );
};
export default PokedexListing;
