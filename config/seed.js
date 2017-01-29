var mongoose = require('mongoose');
require('../app/models/user');
var User = mongoose.model('User');
var faker = require('faker');
var _ = require('underscore')
mongoose.connect('mongodb://localhost/test');


User.create({
  username: 'sweet',
  pictureUrl: faker.image.imageUrl(),
  email: faker.internet.email()

}).then(function(shaun) {
  User.create({
    username: 'test1',
    pictureUrl: faker.image.imageUrl(),
    email: faker.internet.email()
  }).then(function(cum) {
    User.create({
      username: 'test2',
      pictureUrl: faker.image.imageUrl(),
      email: faker.internet.email()
    }).then(function(avalon) {
      shaun.friends.push(cum._id);
      shaun.friends.push(avalon._id);
      shaun.save();
      avalon.friends.push(shaun._id);
      avalon.save();
      cum.friends.push(shaun._id);
      cum.save();
      console.log(shaun, cum, avalon);
    })
  })
})


for (var i = 0; i < 8; i++) {
  User.create({
    username: faker.internet.userName(),
    pictureUrl: faker.image.imageUrl(),
    email: faker.internet.email()
  })
}
