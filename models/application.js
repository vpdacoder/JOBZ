var mongoose = require('mongoose');
Interview = require("./interviews");

var AppSchema = new mongoose.Schema({
  company: String,
  position: String,
  date: String,
  description: String,
  location: String,
  jobBoard: String,
  interview: [Interview.schema]
});

var App = mongoose.model('App', AppSchema);

module.exports = App;
