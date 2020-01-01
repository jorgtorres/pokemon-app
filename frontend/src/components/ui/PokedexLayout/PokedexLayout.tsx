import React from "react";
import * as styles from "./PokedexLayout.module.scss";
import Pokeball from "../../../assets/pokeball.svg";

const PokedexLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.titleContainer}>
        <Pokeball className={styles.svg} />
        <h1 className={styles.headline}>Pokédex</h1>
      </div>
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export default PokedexLayout;
