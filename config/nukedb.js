var mongoose = require('mongoose');
require('../app/models/user');
var User = mongoose.model('User');
mongoose.connect('mongodb://localhost/test');

User.remove().exec();
console.log('BOOOM!!!!  Removed Models!');
mongoose.connection.close();
