var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/hola', function(req, res, next) {
  console.log(req.query);
});

module.exports = router;
