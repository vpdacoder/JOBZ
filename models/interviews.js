var mongoose = require('mongoose');

var InterviewSchema = new mongoose.Schema({
  company: String,
  date: String,
  interviewer: String,
  interviewerLi: String,
  jobDescription: String,
  inNews: String
});

var Interview = mongoose.model('Interview', InterviewSchema);

module.exports = Interview;
