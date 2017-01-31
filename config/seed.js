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
  }).then(function(test1) {
    User.create({
      username: 'test2',
      pictureUrl: faker.image.imageUrl(),
      email: faker.internet.email()
    }).then(function(test2) {
      shaun.friends.push(test1._id);
      shaun.friends.push(test2._id);
      shaun.save();
      test2.friends.push(shaun._id);
      test2.save();
      test1.friends.push(shaun._id);
      test1.save();
      console.log(shaun, test1, test2);
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
