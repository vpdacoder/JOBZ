var mongoose = require('mongoose');
passportLocalMongoose = require('passport-local-mongoose')

App = require("./application");

var InterviewSchema = new mongoose.Schema({
  company: String,
  date: String,
  interviewer: String,
  interviewerLi: String,
  jobDescription: String,
  inNews: String
});


var AppSchema = new mongoose.Schema({
  company: String,
  position: String,
  applicationDate: String,
  jobDescription: String,
  location: String,
  jobBoard: String,
  interview: [InterviewSchema]
});


var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  applications: [AppSchema]
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

module.exports = User;
