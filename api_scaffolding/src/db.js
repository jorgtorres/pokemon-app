const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.resolve(__dirname, '..', 'data.sqlite');

let db;

function initialize() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) return reject(err);

      // enable foreign keys
      db.run('PRAGMA foreign_keys = ON');

      // create User table
      db.run(
        `CREATE TABLE IF NOT EXISTS User (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE
        )`
      );

      // create Task table, associated to User
      db.run(
        `CREATE TABLE IF NOT EXISTS Task (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          status TEXT DEFAULT 'pending',
          due_date TEXT,
          user_id INTEGER,
          FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
        )`
      );

      resolve();
    });
  });
}

function getDb() {
  if (!db) throw new Error('Database not initialized. Call initialize() first.');
  return db;
}

module.exports = { initialize, getDb };
