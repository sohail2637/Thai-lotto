let mongoose = require("mongoose");

let TimeLineSchema = mongoose.Schema({
  date: String,
  time: String,
  selectedDate: String,
});

let TimeLine = mongoose.model("timeline", TimeLineSchema);

module.exports = TimeLine;
