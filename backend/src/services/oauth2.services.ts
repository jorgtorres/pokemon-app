import oauth2orize from 'oauth2orize';
import db from '../db.js';
import crypto from 'crypto';
import config from '../config/config.json' with { type: 'json' };
import type User from '../model/User.js';

interface TokenModel {
  userId: string;
  clientId: string;
  token?: string;
}

type CallbackFunction = (
  err: Error | null,
  accessToken?: string | boolean,
  refreshToken?: string,
  params?: { expires_in: string }
) => void;

class OAuth2Service {
  oauthServer = oauth2orize.createServer();
  constructor() {
    this.initOauth2Server();
  }

  public getToken() {
    return this.oauthServer.token();
  }

  public getErrorHandler() {
    return this.oauthServer.errorHandler();
  }

  initOauth2Server() {
    const checkPassword = this.checkPassword.bind(this);
    const generateTokens = this.generateTokens.bind(this);
    this.oauthServer.exchange(
      oauth2orize.exchange.password(
        function (client, username, password, scope, done) {
          db.get(
            'SELECT * FROM user WHERE username = ?',
            [username],
            function (err: Error | null, row: User) {
              if (err) {
                return done(err);
              }
              if (
                !row ||
                !checkPassword(password, row.hashed_password, row.salt)
              ) {
                return done(null, false);
              }
              const model: TokenModel = {
                userId: row.id.toString(),
                clientId: client.clientId,
              };

              generateTokens(model, done);
            }
          );
        }
      )
    );
  }

  generateTokens(data: TokenModel, done: CallbackFunction): void {
    db.run(
      'DELETE FROM access_token WHERE user_id = ? AND client_id = ?',
      [data.userId, data.clientId],
      (err: Error | null) => {
        console.log('Old access tokens deleted', err);
      }
    );
    db.run(
      'DELETE FROM refresh_token WHERE user_id = ? AND client_id = ?',
      [data.userId, data.clientId],
      (err: Error | null) => {
        console.log('Old refresh tokens deleted', err);
      }
    );
    const tokenValue = crypto.randomBytes(32).toString('hex');
    const refreshTokenValue = crypto.randomBytes(32).toString('hex');
    db.run(
      'INSERT INTO refresh_token (user_id, client_id, token) VALUES (?, ?, ?)',
      [data.userId, data.clientId, refreshTokenValue],
      (err: Error | null) => {
        if (err) {
          return done(err);
        }
        db.run(
          'INSERT INTO access_token (user_id, client_id, token) VALUES (?, ?, ?)',
          [data.userId, data.clientId, tokenValue],
          (err: Error | null) => {
            if (err) {
              return done(err);
            }
            return done(null, tokenValue, refreshTokenValue, {
              expires_in: config.security.tokenLife.toString(),
            });
          }
        );
      }
    );
  }

  private checkPassword(
    password: string,
    userPassword: Buffer,
    salt: Buffer
  ): boolean {
    const encryptedPassword = crypto.pbkdf2Sync(
      password,
      salt,
      310000,
      32,
      'sha256'
    );
    return encryptedPassword.equals(userPassword);
  }
}

export default OAuth2Service;
