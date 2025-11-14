const dbModule = require('../db');

function create(task) {
  const db = dbModule.getDb();
  const sql = `INSERT INTO Task (title, description, status, due_date, user_id) VALUES (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [task.title, task.description, task.status || 'pending', task.due_date, task.user_id], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, ...task });
    });
  });
}

function updateById(id, task) {
  const db = dbModule.getDb();
  const sql = `UPDATE Task SET title = ?, description = ?, status = ?, due_date = ?, user_id = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(sql, [task.title, task.description, task.status, task.due_date, task.user_id, id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
}

function deleteById(id) {
  const db = dbModule.getDb();
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM Task WHERE id = ?`, [id], function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
  });
}

function getAll(filter) {
  const db = dbModule.getDb();
  let sql = `SELECT * FROM Task`;
  const params = [];
  if (filter && filter.user_id) {
    sql += ` WHERE user_id = ?`;
    params.push(filter.user_id);
  }
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function getById(id) {
  const db = dbModule.getDb();
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM Task WHERE id = ?`, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row || null);
    });
  });
}

module.exports = { create, updateById, deleteById, getAll, getById };
