import { Router } from 'express';
import OAuth2Service from '../services/oauth2.services.js';
import passport from 'passport';

export class AuthenticationRouter {
  router: Router;
  oAuthService = new OAuth2Service();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post(
      '/',
      passport.authenticate(['basic', 'oauth2-client-password'], {
        session: false,
      }),
      this.oAuthService.getToken(),
      this.oAuthService.getErrorHandler()
    );
  }
}
