var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  applications: {
    company: String,
    position: String,
    applicationDate: String,
    jobDescription: String,
    location: String,
    jobBoard: String,
    interview: {
      company: String,
      date: String,
      interviewer: String,
      interviewerLi: String,
      jobDescription: String,
      inNews: String
    }
  }
});
