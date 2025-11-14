import React from "react";
import * as styles from "./PokemonStats.module.scss";

interface PokemonStatsProps {
  stats: Array<{ stat: { name: string }; base_stat: number }>;
}

const PokemonStats = ({ stats }: PokemonStatsProps) => {
  return (
    <div className={styles.statsContainer}>
      <h3 className={styles.sectionTitle}>Base Stats</h3>
      <div className={styles.statsList}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.statRow}>
            <span className={styles.statName}>{stat.stat.name.toUpperCase()}</span>
            <span className={styles.statValue}>{stat.base_stat}</span>
            <div className={styles.statBar}>
              <div
                className={styles.statFill}
                style={{ width: `${Math.min(stat.base_stat, 255)}px` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStats;
