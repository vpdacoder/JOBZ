var mongoose = require('mongoose');
Interview = require("./interviews");

var AppSchema = new mongoose.Schema({
  logo: {
          type: String,
          default: "https://static-assets.generalassemb.ly/logos/generalassembly-open-graph.png"
        },
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
