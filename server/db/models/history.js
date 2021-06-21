let mongoose = require('mongoose');


let historySchema = mongoose.Schema({
    date: String,
    time: String,
    first: String,
    secondA: String,
    secondB: String,
    secondC: String
}); 

let History = mongoose.model('history', historySchema);

module.exports = History;
