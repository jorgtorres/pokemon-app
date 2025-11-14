import axios, { type AxiosResponse } from 'axios';
import type Pokemon from 'model/Pokemon.js';
class PokeApiService {
  public searchPokemons(limit?: number): Promise<AxiosResponse<Pokemon[]>> {
    return new Promise((resolve, reject) => {
      const url = `https://pokeapi.co/api/v2/pokemon`;
      axios
        .get(url, { params: { limit } })
        .then(resolve)
        .catch((err) => {
          reject(err);
        });
    });
  }
  public getPokemon(id: string): Promise<AxiosResponse<Pokemon[]>> {
    return new Promise((resolve, reject) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      axios
        .get(url, { params: {} })
        .then(resolve)
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default PokeApiService;
