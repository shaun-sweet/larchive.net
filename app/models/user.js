var mongoose = require('mongoose');
var usersSchema = new mongoose.Schema({
  username: String,
  pictureUrl: String,
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  links: [
    {
      url: String,
      name: String,
      sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      subject: String,
      createdAt: Date
    }
  ],
  email: String
});
mongoose.model('User', usersSchema);
