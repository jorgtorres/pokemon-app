import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { AuthenticationRouter } from './routes/authentication.route.js';
import passport from 'passport';
import AuthConfig from './config/auth.js';
import PokemonRouter from './routes/pokemon.route.js';

class Server {
  public app: express.Application;

  private corsSettings = {
    origin: '*',
    optionsSuccessStatus: 200,
    exposedHeaders: ['Content-Disposition'],
  };

  constructor() {
    this.app = express();
    this.app.use(cors(this.corsSettings));
    this.config();
    this.routes();
  }

  public routes(): void {
    this.app.use('/login', new AuthenticationRouter().router);
    this.app.use('/pokemons', new PokemonRouter().router);
  }

  public config(): void {
    this.app.set('port', process.env.PORT || 5001);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use(passport.initialize());
    new AuthConfig().initPassport();
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.info(
        `API is running at http://localhost:${this.app.get('port')}`
      );
    });
  }
}

const server = new Server();
server.start();
