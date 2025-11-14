import axios, { type AxiosResponse } from 'axios';
import type Pokemon from '../model/Pokemon.js';
import type SearchResponse from '../model/SearchResponse.js';

class PokeApiService {
  pokeapiBaseUrl = 'https://pokeapi.co/api/v2';

  public searchPokemons(
    limit?: string,
    offset?: string
  ): Promise<AxiosResponse<SearchResponse>> {
    return new Promise((resolve, reject) => {
      const url = `${this.pokeapiBaseUrl}/pokemon`;
      axios
        .get<SearchResponse>(url, { params: { limit, offset } })
        .then(resolve)
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getPokemon(id: string): Promise<AxiosResponse<Pokemon>> {
    return new Promise((resolve, reject) => {
      const url = `${this.pokeapiBaseUrl}/pokemon/${id}`;
      axios
        .get<Pokemon>(url, { params: {} })
        .then(resolve)
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getPokemonSpecies(id: string): Promise<AxiosResponse<unknown>> {
    return new Promise((resolve, reject) => {
      const url = `${this.pokeapiBaseUrl}/pokemon-species/${id}`;
      axios
        .get<unknown>(url, { params: {} })
        .then(resolve)
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default PokeApiService;
