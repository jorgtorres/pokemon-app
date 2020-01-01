const dbModule = require('../db');

function create(user) {
  const db = dbModule.getDb();
  const sql = `INSERT INTO User (name, email) VALUES (?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [user.name, user.email], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, ...user });
    });
  });
}

function getById(id) {
  const db = dbModule.getDb();
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM User WHERE id = ?`, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row || null);
    });
  });
}

function getAll() {
  const db = dbModule.getDb();
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM User`, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = { create, getById, getAll };
