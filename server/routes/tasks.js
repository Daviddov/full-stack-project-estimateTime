var express = require('express');
var router = express.Router();
var app = require('../app');
/* GET tasks json. */
router.get('/', function(req, res, next) {
const  tasks= [{title: 'Express' },{title: 'Express' }];
  res.json(tasks);
});


module.exports = router;
