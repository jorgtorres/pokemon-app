import React from "react";
import * as styles from "./PokemonStatDetails.module.scss";
import { PokemonStat } from "../../../../api/model/backend/Pokemon";
import pokemonTypeColor from "../../../../utils/pokemonTypeColor";

interface PokemonStatDetailsProps {
  primaryType: string;
  stats: PokemonStat[];
}

const PokemonStatDetails = ({
  primaryType,
  stats,
}: PokemonStatDetailsProps) => {
  const statAbreviation = (stat: string) => {
    switch (stat) {
      case "attack":
        return "atk";
      case "defense":
        return "def";
      case "special-attack":
        return "satk";
      case "special-defense":
        return "sdef";
      case "speed":
        return "spd";
      default:
        return stat;
    }
  };

  return (
    <div className={styles.statsContainer}>
      <h3
        style={{ color: pokemonTypeColor(primaryType) }}
        className={styles.sectionTitle}
      >
        Base Stats
      </h3>
      <div className={styles.statsList}>
        <div className={styles.statNameContainer}>
          {stats.map((stat, idx) => (
            <span
              key={idx}
              style={{ color: pokemonTypeColor(primaryType) }}
              className={styles.statName}
            >
              {statAbreviation(stat.stat.name).toUpperCase()}
            </span>
          ))}
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statRowContainer}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statRow}>
              <span className={styles.statValue}>
                {stat.base_stat.toString().padStart(3, "0")}
              </span>
              <div className={styles.statBarContainer}>
                <div className={styles.statBar}>
                  <div
                    className={styles.statFill}
                    style={{
                      width: `${stat.base_stat / 2}%`,
                      background: pokemonTypeColor(primaryType),
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonStatDetails;
