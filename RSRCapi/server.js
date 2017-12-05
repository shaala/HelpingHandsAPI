var express = require('express'),
  app = express(),

  port = process.env.PORT || 8100,

 //  app.listen(port);
 //   Task = require('./api/models/rsrcModel'), //created model loading here
 //   bodyParser = require('body-parser');
 //
 // // mongoose instance connection url connection
 // mysql.Promise = global.Promise;
 // mysql.connect('104.198.103.85');
 //
 //
 // app.use(bodyParser.urlencoded({ extended: true }));
 // app.use(bodyParser.json());
 //
 //
 // var routes = require('./api/routes/doneRoutes'); //importing route
 // routes(app); //register the route


 app.listen(port);

console.log('Done RESTful API server started on: ' + port);
