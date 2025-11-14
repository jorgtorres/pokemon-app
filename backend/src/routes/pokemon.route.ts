import passport from 'passport';
import { Router } from 'express';

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
      (req, res) => {
        res.json({ message: 'Welcome to the Pokemon API' });
      }
    );
  }
}

export default PokemonRouter;
