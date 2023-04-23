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
  const [newUser] = await pool.execute(
        'SELECT * FROM Users WHERE id = ?',
        [rows.insertId]
      );
      
      console.log(newUser[0]);
      return newUser[0];
}



async function createTable() {
  const [rows] = await pool.execute(
    `CREATE TABLE IF NOT EXISTS tasks(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    userId VARCHAR(255),
                    title VARCHAR(255),
                    details VARCHAR(255),
                    estimateTime VARCHAR(255)
                  )`
  );
  return rows;
}

async function createDB(dbName, pool) {
  try {
    const [rows] = await pool.execute(
      `CREATE DATABASE IF NOT EXISTS ${dbName}`
    );
    return { success: true, message: `Database ${dbName} created`, rows };
  } catch (err) {
    return { success: false, message: `Error creating database: ${err.message}` };
  }
}



async function getUsers() {
  const [rows] = await pool.execute('SELECT * FROM users');
  return rows;
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
 
  async function createTask(taskData) {
    const [insertResult] = await pool.execute(
      'INSERT INTO tasks (userId, title, details, estimateTime) VALUES (?, ?, ?, ?)',
      [taskData.userId, taskData.title, taskData.details, taskData.estimateTime]
    );
    
    const [newTask] = await pool.execute(
      'SELECT * FROM tasks WHERE id = ?',
      [insertResult.insertId]
    );
    
    console.log(newTask[0]);
    return newTask[0];
  }
  
  
  

async function getTasks(userId) {
  
  const [rows] = await pool.execute('SELECT * FROM tasks WHERE userId = ?',
  [userId]);
  return rows;
}

async function deleteTask(taskId) {
  const [rows] = await pool.execute(
    'DELETE FROM tasks WHERE id = ?',
    [taskId]
    );
    return rows;
  }

module.exports = {
  createDB,
  createUser,
  getUsers,
  deleteTask,
  deleteUser,
  getUserByNameAndPassword,
  createTask,
  createTable,
  getTasks,
};
