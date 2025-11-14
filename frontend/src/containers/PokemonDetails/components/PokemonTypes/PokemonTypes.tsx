import React from "react";
import * as styles from "./PokemonTypes.module.scss";
import Pokemon, { PokemonType } from "../../../../api/model/backend/Pokemon";
import pokemonTypeColor from "../../../../utils/pokemonTypeColor";

interface PokemonTypesProps {
  types: Pokemon["types"];
}

const PokemonTypes = ({ types }: PokemonTypesProps) => {
  return (
    <div className={styles.typesContainer}>
      {types.map((typeObj, idx) => (
        <span
          style={{ background: pokemonTypeColor(typeObj.type.name) }}
          key={idx}
          className={styles.typeBadge}
        >
          {typeObj.type.name}
        </span>
      ))}
    </div>
  );
};

export default PokemonTypes;
