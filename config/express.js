var session = require('express-session');
var bodyParser = require('body-parser');
var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var flash = require('connect-flash');
var csrf = require('csurf');
var methodOverride = require('method-override');
var pug = require('pug');
var mongoStore = require('connect-mongo')(session);
var helpers = require('view-helpers');
var winston = require('winston');
var env = process.env.NODE_ENV || 'development';
var pkg = require('../package.json');
module.exports = function(app, passport) {

  // Compression Middleware.  Needs to be at the top before express.static
  app.use(compression({
    threshold: 512
  }));

  // Static File directory
  app.use(express.static('./public'));

  // Use winston on production
  var log;
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message);
        }
      }
    };
  } else {
    log = 'dev';
  }

  app.set('views', './app/views');
  app.set('view engine', 'pug');
  // Body Parser needs to be above methodOverride since it relies on it
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  app.use(session({
    secret: pkg.name,
    proxy: true,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      url: process.env.DB_CONN_URL,
      collection : 'sessions'
    })
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages - should be declared after sessions
  app.use(flash());

  // should be declared after session and flash
  app.use(helpers(pkg.name));

  // adds CSRF support like rails
  if (process.env.NODE_ENV !== 'test') {
    app.use(csrf());

    app.use(function (req, res, next){
      res.locals.csrf_token = req.csrfToken();
      next();
    });
  }

}
