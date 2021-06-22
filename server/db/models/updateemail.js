let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  email: String | Number,
  pin: Number,
});

let SendMessage = mongoose.model("sendmsg", userSchema);

module.exports = SendMessage;
