
// // create db in my sql
// app.post('/db', (req, res) => {
//     let sql = 'CREATE DATABASE tasks'
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("Result: ", result);
//         res.send( JSON.stringify(result));
//     })
// })

// // CREATE TABLE users
// app.post('/addTable', (req, res) => {
//     let sql = 'CREATE TABLE IF NOT EXISTS users(
//   id int AUTO_INCREMENT, 
//   first_name VARCHAR(255), 
//   last_name VARCHAR(255), 
//   PRIMARY KEY(id))'
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("Result: ", result);
//         res.send(JSON.stringify(result));
//     })
// })




// module.exports = app;
const express = require('express') ;
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const cors = require('cors');

const app = express(); // Initialize the Express app

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// add user
app.post('/addUser', async (req, res, next) => {
  console.log(req.body);
  try {
    await db.createUser(req.body);
    res.send('User created successfully');
  } catch (err)  {
    next(err);
  }
});



//get all users
app.get('/users', async (req, res, next) => {
  try {
    const users = await db.getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
// get User By Name And Password
app.post('/user', async (req, res, next) => {
  try {
    const user = await db.getUserByNameAndPassword(req.body);
    if (user) {
      res.json(user);
    } else {
res.status(401);
res.end();
    }
  } catch (err) {
    next(err);
  }
});

// CREATE TABLE tasks
app.post('/addTable', async (req, res, next) => {
  try {
    await db.createTable(req.body);
    res.send('Table created successfully');
  } catch (err)  {
    next(err);
  }
 });
 
 //add task
 app.post('/addTask', async (req, res, next) => {
   console.log(req.body);
   try {
     const task = await db.createTask(req.body);
     if(task){
       res.json(task);
       res.send('task created successfully');
     }
   } catch (err)  {
     next(err);
   }
 });
 
 //get all tasks by userId
 app.get('/tasks/:userId', async (req, res, next) =>  {
  
  try {
    const tasks = await db.getTasks(req.params.userId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}) ;


 //get user by id
// app.get('/users/:id', async (req, res, next) => {
//   try {
//     const user = await db.getUserById(req.params.id);
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// });

// delete user by id
// app.delete('/users/:id', async (req, res, next) => {
//   try {
//     await db.deleteUser(req.params.id);
//     res.send('User deleted successfully');
//   } catch (err) {
//     next(err);
//   }
// });

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

module.exports = app;
