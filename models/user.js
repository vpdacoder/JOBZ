var mongoose = require('mongoose');
passportLocalMongoose = require('passport-local-mongoose')

module.exports.App = require("./application");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  // applications: [App],
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;
