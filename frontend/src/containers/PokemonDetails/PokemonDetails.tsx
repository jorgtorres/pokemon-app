import React from "react";
import { useBackendGetPokemon } from "../../api/services/backend/hooks/backendHooks";
import { navigate as reachNavigate } from "@reach/router";
import * as styles from "./PokemonDetails.module.scss";
import PokemonHeader from "./components/PokemonHeader/PokemonHeader";
import PokemonImage from "./components/PokemonImage/PokemonImage";
import PokemonTypes from "./components/PokemonTypes/PokemonTypes";
import PokemonAbout from "./components/PokemonAbout/PokemonAbout";
import PokemonStats from "./components/PokemonStats/PokemonStats";

interface PokemonDetailsProps {
  id: string;
  uri: string;
}

const PokemonDetails = ({ id, uri }: PokemonDetailsProps) => {
  const { data } = useBackendGetPokemon(id);

  if (!data) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  const pokemonData = data as any; // accept any shape from API response

  const handleBack = () => {
    reachNavigate("/app/pokedex");
  };

  const handleNext = () => {
    const nextId = (Number(id) + 1).toString();
    reachNavigate(`/app/pokedex/${nextId}`);
  };

  const handlePrevious = () => {
    const prevId = Math.max(1, Number(id) - 1).toString();
    reachNavigate(`/app/pokedex/${prevId}`);
  };

  const type = pokemonData.types?.[0].type.name;

  const color = (type: string) => {
    switch (type) {
      case "bug":
        return "#A7B723";
      case "dark":
        return "#75574C";
      case "dragon":
        return "#7037FF";
      case "electric":
        return "#F9CF30";
      case "fairy":
        return "#E69EAC";
      case "fighting":
        return "#C12239";
      case "fire":
        return "#F57D31";
      case "flying":
        return "#A891EC";
      case "ghost":
        return "#70559B";
      case "normal":
        return "#AAA67F";
      case "grass":
        return "#74CB48";
      case "ground":
        return "#DEC16B";
      case "ice":
        return "#9AD6DF";
      case "poison":
        return "#A43E9E";
      case "psychic":
        return "#FB5584";
      case "rock":
        return "#B69E31";
      case "steel":
        return "#B7B9D0";
      case "water":
        return "#6493EB";
      default:
        return "#A7B723";
    }
  };

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color(type)} 0%, ${color(
          type
        )} 100%)`,
      }}
      className={styles.detailsContainer}
    >
      <PokemonHeader
        name={pokemonData.name || "Unknown"}
        id={id}
        onBack={handleBack}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <div className={styles.contentWrapper}>
        <PokemonImage
          imageUrl={
            pokemonData.sprites?.other?.["official-artwork"]?.front_default
          }
        />
        <div className={styles.infoPanel}>
          <PokemonTypes types={pokemonData.types || []} />
          <PokemonAbout
            weight={pokemonData.weight || 0}
            height={pokemonData.height || 0}
            abilities={pokemonData.abilities || []}
          />
          <PokemonStats stats={pokemonData.stats || []} />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
