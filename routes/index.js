var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

/* GET home page. */
router.post('/realState', function(req, res, next) {
  let custom = req.body;
  let route = path.join(__dirname,'../data/data.json');
  let minimo = parseInt(custom.precio.split(';')[0]);
  let maximo = parseInt(custom.precio.split(';')[1]);
  fs.readFile(route, 'utf8', function (err, data) {
    if(err) throw err;
    var filter = JSON.parse(data);
    //Sin filtro
    if (custom.personalizada === 'false') {
      res.send(filter)
    } else if (custom.personalizada === 'true') {//Con filtro
      var customFilter = filter;

      //filtar ciudad
      if (custom.ciudad !== '') {
        for (var i = 0; i < customFilter.length; i++) {
          if (customFilter[i].Ciudad !== custom.ciudad) {
            customFilter.splice(i, 1);
            i--;
          }
        }
      }

      if (custom.tipo !== '') {
        for (var i = 0; i < customFilter.length; i++) {
          if (customFilter[i].Tipo !== custom.tipo) {
            customFilter.splice(i, 1);
            i--;
          }
        }
      }


        for (var i = 0; i < customFilter.length; i++) {
          let precio = parseInt(customFilter[i].Precio.replace('$','').replace(',',''))
          console.log(precio, minimo);
          if (precio < minimo || precio > maximo) {
            customFilter.splice(i, 1);
            i--;
          }
        }

      //console.log(maximo);
      //console.log(customFilter);
      res.send(customFilter);
    }


  })
});

router.post('/filter', function(req, res, next) {
  let customizable = req.body;
  let route = path.join(__dirname,'../data/data.json');

  fs.readFile(route, 'utf8', function (err, data) {
    if(err) throw err;

    if (customizable.customizable === 'true') {
      let city = new Array();
      let type = new Array();
      var filter = JSON.parse(data);
      for (var i = 0; i < filter.length; i++) {
        city.push(filter[i].Ciudad);
        type.push(filter[i].Tipo);
      }
      var citiesObject = [...new Set(city)];
      var typesObject = [...new Set(type)];
      var filterObject = {ciudades: citiesObject, tipo:typesObject}
      res.send(filterObject)
    }

  })
});

module.exports = router;
