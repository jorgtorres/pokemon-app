import React from "react";
import * as styles from "./PokemonTitle.module.scss";
import ArrowBack from "../../../../assets/arrow_back.svg";
import ChevronLeft from "../../../../assets/chevron_left.svg";
import ChevronRight from "../../../../assets/chevron_right.svg";

interface PokemonHeaderProps {
  name: string;
  id: number;
  onBack: () => void;
  onNext: () => void;
  onPrevious: () => void;
  showPrevious: boolean;
  showNext: boolean;
}

const PokemonHeader = ({
  name,
  id,
  onBack,
  onNext,
  onPrevious,
  showPrevious,
  showNext,
}: PokemonHeaderProps) => {
  return (
    <div className={styles.header}>
      <button className={styles.backButton} onClick={onBack}>
        <ArrowBack />
      </button>
      <h1 data-testid="pokemon-details-name" className={styles.title}>
        {name}
      </h1>
      <span data-testid="pokemon-details-id" className={styles.id}>
        #{id.toString().padStart(3, "0")}
      </span>
      {showPrevious && (
        <button className={styles.prevButton} onClick={onPrevious}>
          <ChevronLeft />
        </button>
      )}
      {showNext && (
        <button className={styles.nextButton} onClick={onNext}>
          <ChevronRight />
        </button>
      )}
    </div>
  );
};

export default PokemonHeader;
