import React from "react";
import * as styles from "./PokemonHeader.module.scss";

interface PokemonHeaderProps {
  name: string;
  id: string;
  onBack: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PokemonHeader = ({
  name,
  id,
  onBack,
  onNext,
  onPrevious,
}: PokemonHeaderProps) => {
  return (
    <div className={styles.header}>
      <button className={styles.backButton} onClick={onBack}>
        ←
      </button>
      <h1 className={styles.title}>{name}</h1>
      <span className={styles.id}>#{id}</span>
      <button className={styles.prevButton} onClick={onPrevious}>
        &lt;
      </button>
      <button className={styles.nextButton} onClick={onNext}>
        &gt;
      </button>
    </div>
  );
};

export default PokemonHeader;
