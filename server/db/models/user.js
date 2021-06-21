let mongoose = require('mongoose');


let userSchema = mongoose.Schema({
    name:String,
    email:String | Number,
    password:String
}); 

let User = mongoose.model('user', userSchema);

module.exports = User;
