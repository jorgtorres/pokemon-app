import React from "react";
import * as styles from "./Pokedex.module.scss";
import PokedexListing from "./components/PokedexListing";
import Search from "../../assets/search.svg";
import TextInput from "../../components/ui/TextInput";
import SortButton from "../../components/ui/SortButton";
import PokedexLayout from "../../components/ui/PokedexLayout";

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
    <PokedexLayout>
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
            <SortButton />
          </div>
        </form>
        <PokedexListing search={search} sort={""} />
      </div>
    </PokedexLayout>
  );
};

export default Pokedex;
