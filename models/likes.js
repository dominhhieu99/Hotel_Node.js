//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;


 var likesSchema = new Schema({
    namelike:  {type: String, default: null},
    namelike2: {type: String, default: null},
    roomsid: {type: Schema.Types.ObjectId, ref: 'rooms'},
 });


module.exports = mongoose.model('likes', likesSchema);