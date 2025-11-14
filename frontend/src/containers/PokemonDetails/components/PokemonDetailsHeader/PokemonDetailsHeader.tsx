import React from "react";
import * as styles from "./PokemonDetailsHeader.module.scss";
import { navigate as reachNavigate } from "gatsby";
import Pokemon from "../../../../api/model/backend/Pokemon";
import PokemonTitle from "../PokemonTitle";
import useTypedSelector from "../../../../redux/useTypedSelector";

interface PokemonDetailsHeaderProps {
  imageUrl?: string;
  pokemon: Pokemon;
}

const PokemonDetailsHeader = ({
  imageUrl,
  pokemon,
}: PokemonDetailsHeaderProps) => {
  const {
    pokedexReducer: {
      filterPageReducer: {
        filterPageValues: { currentPokemonList },
      },
    },
  } = useTypedSelector();
  const capitalizedPokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const currentIndex = currentPokemonList.findIndex((p) => p.id === pokemon.id);

  const handleBack = () => {
    reachNavigate("/app/pokedex");
  };

  const handleNext = () => {
    if (currentIndex !== -1 && currentIndex < currentPokemonList.length - 1) {
      const nextPokemon = currentPokemonList[currentIndex + 1];
      reachNavigate(`/app/pokedex/${nextPokemon.id}`);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevPokemon = currentPokemonList[currentIndex - 1];
      reachNavigate(`/app/pokedex/${prevPokemon.id}`);
    }
  };

  return (
    <div className={styles.detailsHeaderContainer}>
      <PokemonTitle
        name={capitalizedPokemonName || "Unknown"}
        id={pokemon.id}
        onBack={handleBack}
        onNext={handleNext}
        onPrevious={handlePrevious}
        showPrevious={currentIndex > 0}
        showNext={
          currentIndex !== -1 && currentIndex < currentPokemonList.length - 1
        }
      />
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <img src={imageUrl} alt="Pokemon" className={styles.image} />
        ) : (
          <div className={styles.placeholder}>No Image</div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetailsHeader;
