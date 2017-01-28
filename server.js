require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.argv.pop();
const session = require('express-session');
const fs = require('fs');
const join = require('path').join;
const models = join(__dirname, 'app/models');
const connection = connect();
const passport = require('passport');

module.exports = {
  app,
  connection
}

// bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.indexOf('js'))
  .forEach(file => console.log(require(join(models, file))))
// bootstrap config
require('./config/express')(app, passport);

// bootstrap routes
app.use('/', require('./config/routes'));


// run server after mongoose connects
connection
  .then(()=> listen())

function listen() {
  app.listen(port, ()=> console.log('Example app listening on port '+port+'!'));
}

function connect() {
  var connection = mongoose.connect('mongodb://localhost/test');
  return connection;
}
