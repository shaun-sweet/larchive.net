var mongoose = require('mongoose');
const User = mongoose.model('User');

exports.new = function(req, res) {

  res.render('link/new')
}
