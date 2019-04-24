//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;


 var comentSchema = new Schema({
    name:  {type: String, default: null},
    noidung: {type: String, default: null},
    roomsid: {type: Schema.Types.ObjectId, ref: 'rooms'},

 });


module.exports = mongoose.model('coment', comentSchema);