var mongoose = require('mongoose');
var usersSchema = new mongoose.Schema({
  _id: String,
  username: String,
  pictureUrl: String,
  facebook: {
    token: String
  },
  friends: [{type: String, ref: 'User'}],
  links: [
    {
      url: String,
      name: String,
      sender: {type: String, ref: 'User'},
      subject: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  email: String
}, {_id: false});
mongoose.model('User', usersSchema);
