import React from "react";
import * as styles from "./PokemonAbout.module.scss";
import {
  PokemonAbility,
  PokemonSpecies,
} from "../../../../api/model/backend/Pokemon";
import pokemonTypeColor from "../../../../utils/pokemonTypeColor";
import Weigth from "../../../../assets/weight.svg";
import Straighten from "../../../../assets/straighten.svg";
import { useBackendGetPokemonSpecies } from "../../../../api/services/backend/hooks/backendHooks";

interface PokemonAboutProps {
  id: number;
  primaryType: string;
  weight: number;
  height: number;
  abilities: PokemonAbility[];
}

const PokemonAbout = ({
  id,
  primaryType,
  weight,
  height,
  abilities,
}: PokemonAboutProps) => {
  const { data: pokemonSpecies } =
    useBackendGetPokemonSpecies<PokemonSpecies>(id);

  const weightInKg = (weight / 10).toFixed(1);
  const heightInM = (height / 10).toFixed(1);

  return (
    <div className={styles.aboutContainer}>
      <h3
        style={{ color: pokemonTypeColor(primaryType) }}
        className={styles.sectionTitle}
      >
        About
      </h3>
      <div className={styles.aboutGrid}>
        <div className={styles.stat}>
          <div className={styles.statContent}>
            <Weigth className={styles.icon} />
            <p className={styles.value}>{weightInKg} kg</p>
          </div>
          <p className={styles.label}>Weight</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.stat}>
          <div className={styles.statContent}>
            <Straighten className={styles.icon} />
            <p className={styles.value}>{heightInM} m</p>
          </div>
          <p className={styles.label}>Height</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.stat}>
          <div>
            {abilities.map((ability, idx) => (
              <p key={idx} className={styles.ability}>
                {ability.ability.name}
              </p>
            ))}
            <p className={styles.label}>Moves</p>
          </div>
        </div>
      </div>
      <p className={styles.description}>
        {pokemonSpecies?.flavor_text_entries?.[0]?.flavor_text}
      </p>
    </div>
  );
};

export default PokemonAbout;
