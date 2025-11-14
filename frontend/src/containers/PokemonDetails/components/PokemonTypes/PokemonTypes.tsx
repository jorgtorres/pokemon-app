import React from "react";
import * as styles from "./PokemonTypes.module.scss";

interface PokemonTypesProps {
  types: Array<{ type: { name: string } }>;
}

const PokemonTypes = ({ types }: PokemonTypesProps) => {
  return (
    <div className={styles.typesContainer}>
      {types.map((typeObj, idx) => (
        <span key={idx} className={styles.typeBadge}>
          {typeObj.type.name}
        </span>
      ))}
    </div>
  );
};

export default PokemonTypes;
