const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'tasks',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function createUser(userData) {
  const [rows] = await pool.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [userData.name, userData.email, userData.password]
  );
  return rows.insertId;
}

async function getUsers() {
  const [rows] = await pool.execute('SELECT * FROM users');
  return rows;
}

async function getUserById(userId) {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  return rows[0];
}

async function getUserByNameAndPassword(body) {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE name = ? AND password = ?',
    [body.name, body.password]
  );
  return rows[0];
}


async function deleteUser(userId) {
  const [rows] = await pool.execute(
    'DELETE FROM users WHERE id = ?',
    [userId]
  );
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  getUserByNameAndPassword,
};
