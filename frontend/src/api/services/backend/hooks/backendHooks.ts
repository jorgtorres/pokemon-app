import Pokemon, { PokemonSpecies } from "../../../model/backend/Pokemon";
import { SearchResponse } from "../../../model/backend/SearchResponse";
import { useCustomQuery, UseCustomQueryOptions } from "../../../utils";
import backendService from "../backend.service";

export const useBackendSearchPokemons = <T extends SearchResponse<Pokemon[]>>(
  {
    limit,
    offset,
  }: Parameters<typeof backendService.backend.searchPokemons>[0],
  options?: UseCustomQueryOptions<T>
) => {
  return useCustomQuery<T>(
    ["POKEMON"],
    async () =>
      await backendService.backend.searchPokemons({
        limit,
        offset,
      }),
    options
  );
};

export const useBackendGetPokemon = <T extends Pokemon>(
  id: Parameters<typeof backendService.backend.getPokemon>[0],
  options?: UseCustomQueryOptions<T>
) => {
  return useCustomQuery<T>(
    ["POKEMON", id],
    async () => await backendService.backend.getPokemon(id),
    options
  );
};

export const useBackendGetPokemonSpecies = <T extends PokemonSpecies>(
  id: Parameters<typeof backendService.backend.getPokemonSpecies>[0],
  options?: UseCustomQueryOptions<T>
) => {
  return useCustomQuery<T>(
    ["POKEMON_SPECIES", id.toString()],
    async () => await backendService.backend.getPokemonSpecies(id),
    options
  );
};
