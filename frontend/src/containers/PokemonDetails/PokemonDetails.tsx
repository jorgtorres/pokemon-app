import React from "react";
import { useBackendGetPokemon } from "../../api/services/backend/hooks/backendHooks";
import * as styles from "./PokemonDetails.module.scss";
import PokemonDetailsHeader from "./components/PokemonDetailsHeader/PokemonDetailsHeader";
import PokemonTypes from "./components/PokemonTypes/PokemonTypes";
import PokemonAbout from "./components/PokemonAbout/PokemonAbout";
import PokemonStatDetails from "./components/PokemonStatDetails/PokemonStatDetails";
import Pokemon from "../../api/model/backend/Pokemon";
import pokemonTypeColor from "../../utils/pokemonTypeColor";

interface PokemonDetailsProps {
  id: string;
  uri: string;
}

const PokemonDetails = ({ id, uri }: PokemonDetailsProps) => {
  const { data: pokemon } = useBackendGetPokemon<Pokemon>(id);

  if (!pokemon) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  const type = pokemon.types?.[0].type.name;

  const color = pokemonTypeColor(type);

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color} 100%)`,
      }}
      className={styles.pokemonDetailsContainer}
    >
      <div className={styles.contentWrapper}>
        <PokemonDetailsHeader
          imageUrl={pokemon.sprites?.other?.["official-artwork"]?.front_default}
          pokemon={pokemon}
        />
        <div className={styles.infoPanel}>
          <PokemonTypes types={pokemon.types || []} />
          <PokemonAbout
            id={pokemon.id}
            primaryType={type}
            weight={pokemon.weight || 0}
            height={pokemon.height || 0}
            abilities={pokemon.abilities || []}
          />
          <PokemonStatDetails primaryType={type} stats={pokemon.stats || []} />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
