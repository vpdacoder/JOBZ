var mongoose = require('mongoose');
passportLocalMongoose = require('passport-local-mongoose')

App = require("./application");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  applications: [App.schema]
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;
