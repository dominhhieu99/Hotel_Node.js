//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;


 var roomsSchema = new Schema({
    room_number:  {type: String, unique : true, required : true, dropDups: true, unique:true},
    floor: {type: Number, default: null},
    hotelid: {type: Schema.Types.ObjectId, ref: 'hotels'},
    single_room: {type: Boolean, default: null},
    price: {type: Number, default: null},
    status: {type: String, default: null},
    image: {type: String, default: null},
    detail: {type: String, default: null},
 });


module.exports = mongoose.model('rooms', roomsSchema);