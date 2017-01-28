var mongoose = require('mongoose');
const User = mongoose.model('User');


exports.new = function (req, res) {
  res.render('user/login');
};

exports.index = function(req, res) {
  res.render('user/index');
}
