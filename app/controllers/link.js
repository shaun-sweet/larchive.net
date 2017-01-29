var mongoose = require('mongoose');
const User = mongoose.model('User');

exports.new = function(req, res) {
  User
    .findOne({_id: req.session.user._id})
    .populate('friends')
    .exec( (err, friends) => {

      res.render('link/new', friends)
    })
}

exports.delete = function(req, res) {
  User
    .findOne({ _id: req.session.user._id })
    .select('links')
    .exec(function(err, user) {
      // has to be a better way.  Definitely a refactor
      removeLink(user, req.params.id);
      res.redirect('/');
    })
}

exports.create = function(req, res) {
  res.redirect('/')
}


function removeLink(user, linkId) {
  var links = user.links
  for (var i = 0; i < links.length; i++) {
    if (links[i]._id == linkId) {
      user.links[i].remove();
      user.save();
    }
  }
}
