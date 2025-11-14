import passport from 'passport';
import { Router } from 'express';
import pokemonController from '../controllers/pokemon.controller.js';

export class PokemonRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get(
      '/',
      passport.authenticate('bearer', { session: false }),
      pokemonController.searchPokemons
    );

    this.router.get(
      '/:id',
      passport.authenticate('bearer', { session: false }),
      pokemonController.getPokemon
    );

    this.router.get(
      '/pokemon-species/:id',
      passport.authenticate('bearer', { session: false }),
      pokemonController.getPokemonSpecies
    );
  }
}

export default PokemonRouter;
