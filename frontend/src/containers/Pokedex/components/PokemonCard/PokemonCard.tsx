import React from "react";
import * as styles from "./PokemonCard.module.scss";
import Pokemon from "../../../../api/model/backend/Pokemon";
import { navigate } from "gatsby";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const pokemonId = new URL(pokemon.url).pathname
    .replace(/\/$/, "")
    .split("/")
    .pop();

  const capitalizedPokemonName =
    pokemon?.name?.charAt(0)?.toUpperCase() + pokemon.name.slice(1);

  const goToPokemonDetails = () => {
    navigate(`/app/pokedex/${pokemonId}`);
  };

  return (
    <div
      data-testid={`pokemon-card-${pokemonId}`}
      className={styles.cardContainer}
      onClick={goToPokemonDetails}
    >
      <span className={styles.pokemonId}>#{pokemonId?.padStart(3, "0")}</span>
      <img
        className={styles.pokemonImage}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
        alt={capitalizedPokemonName}
      />
      <div data-testid="pokemon-card-name" className={styles.pokemonName}>
        {capitalizedPokemonName}
      </div>
    </div>
  );
};

export default PokemonCard;
