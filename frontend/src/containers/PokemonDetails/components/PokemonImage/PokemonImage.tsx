import React from "react";
import * as styles from "./PokemonImage.module.scss";

interface PokemonImageProps {
  imageUrl?: string;
}

const PokemonImage = ({ imageUrl }: PokemonImageProps) => {
  return (
    <div className={styles.imageContainer}>
      {imageUrl ? (
        <img src={imageUrl} alt="Pokemon" className={styles.image} />
      ) : (
        <div className={styles.placeholder}>No Image</div>
      )}
    </div>
  );
};

export default PokemonImage;
