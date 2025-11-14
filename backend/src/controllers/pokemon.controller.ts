import type { RequestHandler, Request, Response, NextFunction } from 'express';
import PokeApiService from '../services/pokeapi.service.js';

class PokemonController {
  pokeApiService = new PokeApiService();
  public searchPokemons: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req, res, next);
    const pokemonList = await this.pokeApiService.searchPokemons();
    res.status(pokemonList.status).json(pokemonList.data);
  };

  public getPokemon: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req, res, next);
    const { id } = req.params as { id: string };
    const pokemonList = await this.pokeApiService.getPokemon(id);
    res.status(pokemonList.status).json(pokemonList.data);
  };
}

export default new PokemonController();
