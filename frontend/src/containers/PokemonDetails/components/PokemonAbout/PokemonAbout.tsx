import React from "react";
import * as styles from "./PokemonAbout.module.scss";

interface PokemonAboutProps {
  weight: number;
  height: number;
  abilities: Array<{ ability: { name: string } }>;
}

const PokemonAbout = ({ weight, height, abilities }: PokemonAboutProps) => {
  const weightInKg = (weight / 10).toFixed(1);
  const heightInM = (height / 10).toFixed(1);

  return (
    <div className={styles.aboutContainer}>
      <h3 className={styles.sectionTitle}>About</h3>
      <div className={styles.aboutGrid}>
        <div className={styles.stat}>
          <span className={styles.icon}>⚖️</span>
          <div>
            <p className={styles.value}>{weightInKg} kg</p>
            <p className={styles.label}>Weight</p>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.stat}>
          <span className={styles.icon}>📏</span>
          <div>
            <p className={styles.value}>{heightInM} m</p>
            <p className={styles.label}>Height</p>
          </div>
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis
        eros vitae tellus condimentum maximus sit amet in eros.
      </p>
    </div>
  );
};

export default PokemonAbout;
