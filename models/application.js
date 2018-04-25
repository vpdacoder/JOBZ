var mongoose = require('mongoose');
module.exports.Interview = require("./interviews");


var AppSchema = new mongoose.Schema({
  company: String,
  position: String,
  applicationDate: String,
  jobDescription: String,
  location: String,
  jobBoard: String,
  // interview: [Interview]
});

var App = mongoose.model('App', AppSchema);

module.exports = App;
