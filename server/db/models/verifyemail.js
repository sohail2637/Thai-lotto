let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  emailcode:  Number,
  pin: Number,
});

let Verify = mongoose.model("Verify", userSchema);

module.exports = SendMessage;
