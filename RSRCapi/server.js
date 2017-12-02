var express = require('express'),
  app = express(),
  var sql = require('mysql');
  port = process.env.PORT || 8100,
   Task = require('./api/models/doneModel'), //created model loading here
   bodyParser = require('body-parser');

 // mongoose instance connection url connection
 mysql.Promise = global.Promise;
 mysql.connect('104.198.103.85');


 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());


 var routes = require('./api/routes/doneRoutes'); //importing route
 routes(app); //register the route


 app.listen(port);

console.log('Done RESTful API server started on: ' + 8100);
