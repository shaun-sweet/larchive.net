var mongoose = require('mongoose');
var usersSchema = new mongoose.Schema({
  fbId: String,
  username: String,
  pictureUrl: String,
  facebook: {
    token: String
  },
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  links: [
    {
      url: String,
      name: String,
      sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      subject: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  email: String
});
mongoose.model('User', usersSchema);
