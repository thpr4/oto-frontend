
/**
 * Module dependencies.
 */
require('dotenv').config();
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');


var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

app.get('/', routes.index);
app.post( '/register', routes.register );
app.post( '/order', routes.order );

http.createServer(app).listen(app.get('port'), "0.0.0.0",function(){
  console.log('Express server listening on 0.0.0.0 - port ' + app.get('port'));
});
