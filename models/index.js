var mongoose = require("mongoose");
var url = process.env.DATABASEURL || "mongodb://localhost/job"
mongoose.connect(url);

module.exports.User = require("./user");
module.exports.App = require("./application");
module.exports.Interview = require("./interviews");
