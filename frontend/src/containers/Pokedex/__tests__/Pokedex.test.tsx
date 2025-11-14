import React from "react";
import {
  useBackendGetPokemonSpecies,
  useBackendSearchPokemons,
} from "../../../api/services/backend/hooks/backendHooks";
import { renderWithRedux } from "../../../utils/testHelpers";
import Pokedex from "../Pokedex";
import { fireEvent } from "@testing-library/react";

jest.mock("../../../api/services/backend/hooks/backendHooks");
const searchPokemonsResponse = useBackendSearchPokemons as jest.Mocked<any>;

const pokemonList = [
  { name: "spearow", url: "https://pokeapi.co/api/v2/pokemon/23/" },
  { name: "fearow", url: "https://pokeapi.co/api/v2/pokemon/22/" },
  { name: "ekans", url: "https://pokeapi.co/api/v2/pokemon/24/" },
  { name: "arbok", url: "https://pokeapi.co/api/v2/pokemon/21/" },
];

const setup = () => {
  searchPokemonsResponse.mockReturnValue({
    data: { results: pokemonList },
    isLoading: false,
    refetch: jest.fn(),
  });

  return renderWithRedux(<Pokedex location={{} as any} />);
};

describe("Pokedex main listing", () => {
  it("should present a rendered pokemon list", () => {
    const { getAllByTestId } = setup();
    const pokemonCards = getAllByTestId(/pokemon-card-name/);
    const pokemonCardLabels = pokemonCards.map((el) => el.innerHTML);
    expect(pokemonCardLabels).toEqual(["Spearow", "Fearow", "Ekans", "Arbok"]);
    expect(pokemonCards.length).toBe(4);
  });

  it("should sort pokemons by number", () => {
    const { getByTestId, getAllByTestId } = setup();
    fireEvent.click(getByTestId("sort-button"));
    fireEvent.click(getByTestId("sort-option-number"));
    const pokemonCards = getAllByTestId(/pokemon-card-name/);
    const pokemonCardLabels = pokemonCards.map((el) => el.innerHTML);
    expect(pokemonCardLabels).toEqual(["Arbok", "Fearow", "Spearow", "Ekans"]);
  });

  it("should sort pokemons by name", () => {
    const { getByTestId, getAllByTestId } = setup();
    fireEvent.click(getByTestId("sort-button"));
    fireEvent.click(getByTestId("sort-option-name"));
    const pokemonCards = getAllByTestId(/pokemon-card-name/);
    const pokemonCardLabels = pokemonCards.map((el) => el.innerHTML);
    expect(pokemonCardLabels).toEqual(["Arbok", "Ekans", "Fearow", "Spearow"]);
  });

  it("should filter pokemon by text", () => {
    const { getByTestId, getAllByTestId } = setup();
    fireEvent.change(getByTestId("search-input"), {
      target: { value: "ar" },
    });
    const pokemonCards = getAllByTestId(/pokemon-card-name/);
    const pokemonCardLabels = pokemonCards.map((el) => el.innerHTML);
    expect(pokemonCardLabels).toEqual(["Arbok"]);
    expect(pokemonCardLabels.length).toBe(1);
  });
});
