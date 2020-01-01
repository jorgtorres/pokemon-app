import React from "react";
interface PokemonCardProps {}
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

  const goToPokemonDetails = () => {
    navigate(`/app/pokedex/${pokemonId}`);
  };

  return (
    <div className={styles.cardContainer} onClick={goToPokemonDetails}>
      <span className={styles.pokemonId}>#{pokemonId}</span>
      <img
        className={styles.pokemonImage}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
        alt={pokemon.name}
      />
      <div className={styles.pokemonName}>{pokemon.name}</div>
    </div>
  );
};

export default PokemonCard;
