import React from "react";
import * as styles from "./Pokedex.module.scss";
import PokedexListing from "./components/PokedexListing";
import Search from "../../assets/search.svg";
import TextInput from "../../components/TextInput";
import FilterButton from "../../components/FilterButton";
import Pokeball from "../../assets/pokeball.svg";

interface PokedexProps {
  location: Location;
}

const Pokedex = ({ location, ...rest }: PokedexProps) => {
  const [search, setSearch] = React.useState<string>("");
  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "search") {
      setSearch(event.target.value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className={styles.layout}>
      <div className={styles.titleContainer}>
        <Pokeball className={styles.svg} />
        <h1 className={styles.headline}>Pokédex</h1>
      </div>
      <div className={styles.pokedexContainer}>
        <form
          className={styles.form}
          method="post"
          onSubmit={async (event) => {
            await handleSubmit(event);
          }}
        >
          <div className={styles.formContainer}>
            <TextInput
              name="search"
              placeholder="Search"
              handleUpdate={handleUpdate}
              Icon={Search}
            />
            <FilterButton />
          </div>
        </form>
        <PokedexListing search={search} />
      </div>
    </div>
  );
};

export default Pokedex;
