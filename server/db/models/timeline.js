let mongoose = require('mongoose');


let TimeLineSchema = mongoose.Schema({
    date: String,
    time: String
}); 

let TimeLine = mongoose.model('timeline', TimeLineSchema);

module.exports = TimeLine;
