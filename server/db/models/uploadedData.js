module.exports = {
  secret: "secret password",
};
let mongoose = require("mongoose");

let uploadSchema = mongoose.Schema({
  type: String,
  name: String,
  poster: String,
  date: Date,
});
let Files = mongoose.model("uploads", uploadSchema);

// module.exports = Files;

let timlenotification = mongoose.Schema({
  date: String,
  time: String,
});

let Timline = mongoose.model("data", timlenotification);


let resualtes = mongoose.Schema({
  first: Number,
  secondA: Number,
  secondB: Number,
  secondC: Number,
});
let Resaluts = mongoose.model("data", timlenotification);


module.exports = { Timline, Files, Resaluts };
