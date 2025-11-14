import sqlite3 from 'sqlite3';
import crypto from 'crypto';
import { mkdirp } from 'mkdirp';

mkdirp.sync('./var/db');

const db = new sqlite3.Database('./var/db/sessions.db');
db.serialize(function () {
  db.run(
    'CREATE TABLE IF NOT EXISTS user ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB)'
  );
  db.run(
    'CREATE TABLE IF NOT EXISTS access_token ( \
    id INTEGER PRIMARY KEY, \
    user_id TEXT, \
    client_id TEXT, \
    token TEXT, \
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)'
  );
  db.run(
    'CREATE TABLE IF NOT EXISTS refresh_token ( \
    id INTEGER PRIMARY KEY, \
    user_id TEXT, \
    client_id TEXT, \
    token TEXT, \
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)'
  );
  // create an initial user (username: admin, password: admin)
  const salt = crypto.randomBytes(16);
  db.run(
    'INSERT OR IGNORE INTO user (username, hashed_password, salt) VALUES (?, ?, ?)',
    ['admin', crypto.pbkdf2Sync('admin', salt, 310000, 32, 'sha256'), salt]
  );
});

export default db;
