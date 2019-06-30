var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

/* GET home page. */
router.post('/hola', function(req, res, next) {
  let custom = req.body;
  let route = path.join(__dirname,'../data/data.json');

  fs.readFile(route, 'utf8', function (err, data) {
    if(err) throw err;
    var filter = JSON.parse(data);

    if (custom.personalizada === 'false') {
      let city = new Array()
      for (var i = 0; i < filter.length; i++) {
        if (i === 0) {
          city.push(filter[0].Ciudad);
          console.log(city, 'City');
        } else {
          for (var j = 0; j < city.length; j++) {
            if (city[j] !== filter[i].Ciudad) {
              city.push(filter[j].Ciudad)
              console.log(city);
            }
          }
        }
      }
    }

    res.send(filter)
  })
});

module.exports = router;
