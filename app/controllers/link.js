var mongoose = require('mongoose');
const User = mongoose.model('User');

exports.new = function(req, res) {
  User
    .findOne({_id: req.user._id})
    .populate('friends')
    .exec( (err, friends) => {
      res.locals.token = req.user.facebook.token;
      res.render('link/new', friends)
    })
}

exports.delete = function(req, res) {
  User
    .findOne({ _id: req.user._id })
    .select('links')
    .exec(function(err, user) {
      // has to be a better way.  Definitely a refactor
      removeLink(user, req.params.id);
      res.redirect('/');
    })
}

exports.create = function(req, res) {
  var link = {
    url: sanitizeLink(req.body.url),
    name: req.body.name,
    sender: req.user._id,
    subject: req.body.subject
  };
  User
    .findOne({ username: req.body.recipient})
    .exec(function(err, user) {
      user.links.push(link);
      user.save();
      res.redirect('/');
    })
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

function sanitizeLink(link) {
  var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  var regex = new RegExp(expression);
  if (link.match(regex)) {
    return link;
  } else {
    return "http://"+ link;
  }
}
