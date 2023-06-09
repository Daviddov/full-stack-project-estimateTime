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

// async function createUser(userData) {
//   const [rows] = await pool.execute(
//     'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
//     [userData.name, userData.email, userData.password]
//   );
//   const [newUser] = await pool.execute(
//         'SELECT * FROM Users WHERE id = ?',
//         [rows.insertId]
//       );
      
//       console.log(newUser[0]);
//       return newUser[0];
// }
async function createUser(userData) {
  try {
    const [rows] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [userData.name, userData.email, userData.password]
    );
    const [newUser] = await pool.execute(
      'SELECT * FROM Users WHERE id = ?',
      [rows.insertId]
    );
    return newUser[0];
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Email already exists');
    } else {
      throw error;
    }
  }
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

async function addColumn(table, column) {
  const [rows] = await pool.execute(
    `ALTER TABLE ${table} ADD ${column} VARCHAR(255)`
  );
  return rows;
}

async function deleteColumn(table, column) {
  const [rows] = await pool.execute(
    `ALTER TABLE ${table} DROP COLUMN ${column}`
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
async function getUserByEmailAndPassword(body) {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [body.email, body.password]
    );
    return rows[0];
}


async function deleteUser(userId) {
  const [rows] = await pool.execute(
    'DELETE FROM users WHERE id = ?',
    [userId]
    );

    const [userTasks] = await pool.execute(
      'DELETE FROM tasks WHERE userId = ?',
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
  
async function getAllTasks() {
  const [rows] = await pool.execute('SELECT * FROM tasks');
  return rows;
}

// async function getTasks(userId) {
  
//   const [rows] = await pool.execute('SELECT * FROM tasks WHERE userId = ?',
//   [userId]);
//   return rows;
// }
async function getTasks(userId) {
  const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
  if (users.length === 0) {
    throw new Error(`User with id ${userId} not found`);
  }
  
  const [tasks] = await pool.execute('SELECT * FROM tasks WHERE userId = ?', [userId]);
  return tasks;
}


async function setAdminUser(userId) {
  const [insertResult] = await pool.execute(
    'UPDATE users SET management_authorization = ? WHERE id = ?',
    [1, userId]
  );
  return insertResult;
  }

async function updateTask(taskData) {
  const {id, timeElapsed, finishedTask,  accuracy} = taskData;
  console.log(taskData);
  const [insertResult] = await pool.execute(
    'UPDATE tasks SET timeElapsed = ?, finishedTask = ?, accuracy = ? WHERE id = ?',
    [timeElapsed, finishedTask, accuracy, id]
  );
  
  const [updateTask] = await pool.execute(
    'SELECT * FROM tasks WHERE id = ?',
    [id]
  );
  
  console.log(updateTask[0]);
  return updateTask[0];
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
  createTable,
  addColumn,
  deleteColumn,
  createUser,
  getUsers,
  deleteUser,
  getUserByNameAndPassword,
  getUserByEmailAndPassword,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getAllTasks,
  setAdminUser,
};
