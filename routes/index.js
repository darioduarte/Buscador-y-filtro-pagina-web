var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

/* GET home page. */
router.post('/hola', function(req, res, next) {
  let custom = req.body;
  let route = path.join(__dirname,'../data/data.json');
  let filter;

  fs.readFile(route, 'utf8', function (err, data) {
    if(err) throw err;
    filter = JSON.parse(data)

    

    res.send(filter)
  })
});

module.exports = router;
