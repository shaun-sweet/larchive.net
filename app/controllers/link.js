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
