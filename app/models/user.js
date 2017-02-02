var mongoose = require('mongoose');
var usersSchema = new mongoose.Schema({
  username: String,
  pictureUrl: String,
  facebook: {
    id: Number,
    token: String,
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
