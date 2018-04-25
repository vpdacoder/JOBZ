var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/job");

module.exports.User = require("./user");
module.exports.App = require("./application");
module.exports.interview = require("./interviews");
