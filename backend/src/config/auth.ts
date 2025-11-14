import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import type Client from 'model/Client.js';
import type User from 'model/User.js';
import type AccessToken from 'model/AccessToken.js';
import db from '../db.js';
import config from './config.json' with { type: 'json' };

class AuthConfig {
  public initPassport(): void {
    passport.use(
      new BasicStrategy(function (username, password, done) {
        const client = {
          name: 'NextJS App',
          clientId: username,
          clientSecret: password,
        };

        return done(null, client);
      })
    );

    passport.use(
      new ClientPasswordStrategy(function (
        clientId: string,
        clientSecret: string,
        done: (param: Error | null, client: Client | null) => void
      ) {
        const client = {
          id: 1,
          name: 'NextJS App',
          clientId: clientId,
          clientSecret: clientSecret,
        };

        return done(null, client);
      })
    );

    passport.use(
      new BearerStrategy(function (
        accessToken: string,
        done: (
          param: Error | null,
          user?: User | boolean | null,
          params?: { message?: string; scope?: string }
        ) => void
      ) {
        db.get(
          'SELECT * FROM access_token WHERE token = ?',
          [accessToken],
          function (err: Error | null, row: AccessToken | null) {
            if (err) {
              return done(err);
            }
            if (!row) {
              return done(null, false);
            }

            if (
              Math.round(
                (Date.now() - new Date(row.created + 'Z').getTime()) / 1000
              ) > config.security.tokenLife
            ) {
              db.run(
                'DELETE FROM access_token WHERE token = ?',
                [row.token],
                (err) => {
                  if (err) {
                    return done(err);
                  }
                }
              );

              return done(null, false, { message: 'Token expired' });
            }

            db.get(
              'SELECT * FROM user WHERE id = ?',
              [row.user_id],
              function (err: Error | null, row: User | null) {
                if (err) {
                  return done(err);
                }
                if (!row) {
                  return done(null, false, { message: 'Unknown user' });
                }
                const info = { scope: '*' };
                done(null, row, info);
              }
            );
          }
        );
      })
    );
  }
}

export default AuthConfig;
