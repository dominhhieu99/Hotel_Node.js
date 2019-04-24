//Require Mongoose
var mongoose = require('mongoose');

//Định nghĩa một schema
var Schema = mongoose.Schema;


 var hotelsSchema = new Schema({
    name:  {type: String, unique : true, required : true, dropDups: true},
    city: {type: String, default: null,},
    address: {type: String, default: null},
    owner: {type: String, default: null},
    license_number: {type: Number, default: null},
    total_floor: {type: Number, default: null},
    image: {type: String, default: null},
    hotels: [
      {
          ho_id: {type: Schema.Types.ObjectId, ref: 'hotels'},
          ho_name: {type: String, default: null},
          ho_img: {type: String, default: null}
      }
  ]
 });


module.exports = mongoose.model('hotels', hotelsSchema);