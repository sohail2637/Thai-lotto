let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  password:String| Number,
});

let UpdatePass = mongoose.model("updatepass", userSchema);

module.exports = SendMessage;
