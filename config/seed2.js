var mongoose = require('mongoose');
require('../app/models/user');
var User = mongoose.model('User');
var faker = require('faker');
var _ = require('underscore')
mongoose.connect('mongodb://localhost/test');

User.find({},function(err, u) {

  for (var i = 0; i < u.length; i++) {
    for (var z = 0; z < 5; z++) {
      u[i].friends.push(_.sample(u)._id)
      u[i].links.push({
        url: faker.internet.url(),
        name: faker.internet.domainWord(),
        sender: _.sample(u)._id,
        subject: faker.lorem.words()
      })
    }
    u[i].save();
  }
})
