const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'tasks',
};

async function connectToDatabase(dbConfig) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (err) {
    console.error('Error connecting to database', err);
  }
}

async function createUser(userData) {
  const connection = await connectToDatabase(dbConfig);
  const [results, fields] = await connection.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [userData.name, userData.email, userData.password]
  );
  await connection.end();
  return results.insertId;
}

async function getUsers() {
  const connection = await connectToDatabase(dbConfig);
  const [results, fields] = await connection.execute(
    'SELECT * FROM users'
  );
  await connection.end();
  return results;
}

async function getUserById(userId) {
  const connection = await connectToDatabase(dbConfig);
  const [results, fields] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  await connection.end();
  return results[0];
}

async function deleteUser(userId) {
  const connection = await connectToDatabase(dbConfig);
  const [results, fields] = await connection.execute(
    'DELETE FROM users WHERE id = ?',
    [userId]
  );
  await connection.end();
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
};



// const mysql = require('mysql2/promise');

// function connectToDatabase(dbConfig) {
//   return mysql.createConnection(dbConfig);
// }

// async function createUser(user) {
//   const connection = await connectToDatabase();
//   // Your logic for creating a user
// }

// async function getUsers() {
//   const connection = await connectToDatabase();
//   // Your logic for getting all users
// }

// async function getUserById(id) {
//   const connection = await connectToDatabase();
//   // Your logic for getting a user by id
// }

// async function deleteUser(id) {
//   const connection = await connectToDatabase();
//   // Your logic for deleting a user by id
// }

// module.exports = {
//   createUser,
//   getUsers,
//   getUserById,
//   deleteUser,
// };
