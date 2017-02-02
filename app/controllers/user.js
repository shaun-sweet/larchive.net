var mongoose = require('mongoose');
const User = mongoose.model('User');


exports.new = function (req, res) {

  res.render('user/login');
};

// Post '/login'
exports.login = function(req, res) {
  User
    .findOne({ username: req.body.loginUsername})
    .select('_id username')
    .exec((err, user) => {
      if (user) {
        req.session.user = user;
        res.redirect('/');
      }else{
        res.redirect('/login');
      }

    })
}

// logout
exports.logout = function(req, res) {
  req.user = null;
  req.logout();
  res.redirect('/login');
}

// Root directory of app "/"
exports.index = function(req, res) {
  User
    .findOne({_id: req.user._id})
    .select('links username')
    .populate('links.sender')
    .exec( (err, user)=> {
      res.render('user/index', user);
    })
}
