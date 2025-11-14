import React from "react";
import * as styles from "./PokemonButton.module.scss";

interface PokemonButtonProps {
  onClick?: () => void;
  name?: string;
  className?: string;
  id: string;
  disabled?: boolean;
}

const PokemonButton = ({
  onClick,
  name,
  className,
  id,
  disabled,
}: PokemonButtonProps) => {
  return (
    <button
      data-testid={id}
      id={id}
      disabled={disabled}
      className={`${styles.button} ${className ?? ""}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default PokemonButton;
