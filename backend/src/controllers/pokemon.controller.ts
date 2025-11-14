import type { RequestHandler, Request, Response } from 'express';
import PokeApiService from '../services/pokeapi.service.js';

class PokemonController {
  pokeApiService = new PokeApiService();
  public searchPokemons: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const limit = req.query['limit'];
    const offset = req.query['offset'];
    const pokemonList = await this.pokeApiService.searchPokemons(
      limit?.toString(),
      offset?.toString()
    );
    res.status(pokemonList.status).json(pokemonList.data);
  };

  public getPokemon: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const pokemonList = await this.pokeApiService.getPokemon(id);
    res.status(pokemonList.status).json(pokemonList.data);
  };

  public getPokemonSpecies: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { id } = req.params as { id: string };
    const pokemonSpecies = await this.pokeApiService.getPokemonSpecies(id);
    res.status(pokemonSpecies.status).json(pokemonSpecies.data);
  };
}

export default new PokemonController();
