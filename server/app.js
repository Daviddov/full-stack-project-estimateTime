// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const mysql = require('mysql2');
// const cors = require('cors');

// var app = express(); // Initialize the Express app

// app.use(cors())
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: "root",
//     password: "admin",
//     database: "tasks"
// })

// db.connect(err => {
//     if (err) throw err;
//     console.log("DB Connected!");
// })
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
//     let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, first_name VARCHAR(255), last_name VARCHAR(255), PRIMARY KEY(id))'
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log("Result: ", result);
//         res.send(JSON.stringify(result));
//     })
// })
// // add user
// app.post('/adduser', (req, res) => {
//     let user = { first_name: "mosh", last_name: "levi" }
//     let sql = 'INSERT INTO users SET ?'
//     db.query(sql, user, (err, result) => {
//         if (err) throw err;
//         console.log("Result: ", result);
//         res.send(JSON.stringify(result));
//     })
// })
// //getUsers
// app.get('/getUsers', (req, res) => {
//     let sql = 'SELECT * FROM users'
//     db.query(sql, (err, result, fields) => {
//         if (err) throw err;
//         console.log("Result: ", result);
//         // console.log("fields: ", fields);
//         res.send("Result: " + JSON.stringify(result));
//     })
// })
// //getUser by id
// app.get('/getUsers/:id', (req, res) => {
//     console.log(req.params);
//     let sql = `SELECT * FROM users WHERE id = ${req.params.id}`
//     db.query(sql, (err, result) =>{
//       if (err) throw err;
//       console.log("Result: ", result);
//       res.send(JSON.stringify(result) );

//     }) 
// })

// // delete User by id
// app.get('/delete/:id', (req, res) => {
//     let sql = `DELETE from users WHERE id = ${req.params.id}`
//     db.query(sql, (err, result) =>{
//       if (err) throw err;
//       console.log(result);
//       console.log(result.affectedRows)
//       res.send(JSON.stringify(result) );
//     }) 
// })



// module.exports = app;
const express = require('express') ;
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');

const app = express(); // Initialize the Express app

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/users', async (req, res, next) => {
  try {
    await db.createUser(req.body);
    res.send('User created successfully');
  } catch (err) {
    next(err);
  }
});

app.get('/users', async (req, res, next) => {
  try {
    const users = await db.getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await db.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.delete('/users/:id', async (req, res, next) => {
  try {
    await db.deleteUser(req.params.id);
    res.send('User deleted successfully');
  } catch (err) {
    next(err);
  }
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

module.exports = app;
