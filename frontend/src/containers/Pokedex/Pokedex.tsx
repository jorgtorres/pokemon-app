import React from "react";
import * as styles from "./Pokedex.module.scss";
import PokedexListing from "./components/PokedexListing";
import Search from "../../assets/search.svg";
import TextInput from "../../components/ui/TextInput";
import SortButton from "../../components/ui/SortButton";
import PokedexLayout from "../../components/ui/PokedexLayout";
import PokedexListingPageNavigator from "../Pokedex/components/PokedexListing/components/PokedexListingPageNavigator";
import { useDispatch } from "react-redux";
import { setTextSearchValue } from "../../redux/reducers/filterPageReducer";
import useTypedSelector from "../../redux/useTypedSelector";

interface PokedexProps {
  location: Location;
}

const Pokedex = ({ location, ...rest }: PokedexProps) => {
  const dispatch = useDispatch();

  const {
    pokedexReducer: {
      filterPageReducer: {
        filterPageValues: { textSearchValue },
      },
    },
  } = useTypedSelector();

  const handleSearchBarTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setTextSearchValue(event.target.value));
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
              id="search-input"
              name="search"
              placeholder="Search"
              handleUpdate={handleSearchBarTextChange}
              Icon={Search}
              value={textSearchValue}
              isClosable={textSearchValue.length > 0}
              onClose={() => dispatch(setTextSearchValue(""))}
            />
            <SortButton />
          </div>
        </form>
        <PokedexListing />
        <div className={styles.paginationContainer}>
          <PokedexListingPageNavigator />
        </div>
      </div>
    </PokedexLayout>
  );
};

export default Pokedex;
