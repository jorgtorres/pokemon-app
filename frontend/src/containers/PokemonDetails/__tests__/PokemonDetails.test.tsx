import React from "react";
import {
  useBackendGetPokemon,
  useBackendGetPokemonSpecies,
} from "../../../api/services/backend/hooks/backendHooks";
import { renderWithRedux } from "../../../utils/testHelpers";
import PokemonDetails from "../PokemonDetails";

jest.mock("../../../api/services/backend/hooks/backendHooks");
const getPokemonResponse = useBackendGetPokemon as jest.Mocked<any>;
const searchPokemonSpeciesResponse =
  useBackendGetPokemonSpecies as jest.Mocked<any>;

const pokemon = {
  id: 1,
  name: "bulbasaur",
  image: "bulbasaur.png",
};

const setup = () => {
  getPokemonResponse.mockReturnValue({
    data: pokemon,
    isLoading: false,
    refetch: jest.fn(),
  });
  searchPokemonSpeciesResponse.mockReturnValue({
    data: {},
    isLoading: false,
    refetch: jest.fn(),
  });
  return renderWithRedux(<PokemonDetails id={pokemon.id.toString()} uri="/" />);
};

describe("PokemonDetails", () => {
  it("PokemonDetails should display the Pokemon name and image", () => {
    const { getByTestId } = setup();
    expect(getByTestId("pokemon-details-name")).toHaveTextContent(
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    );
    expect(getByTestId("pokemon-details-id")).toHaveTextContent(
      `#${pokemon.id.toString().padStart(3, "0")}`
    );
  });
});
