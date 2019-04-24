var express = require('express');
var router = express.Router();
var Hotels = require('../models/hotels');
var Rooms = require('../models/rooms');
var Coment = require('../models/coment');
var likes = require('../models/likes');
// npm i --save multer
var multer = require('multer');
// npm i --save shortid
var shortid = require('shortid');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/images');
  },
  filename: function(req, file, cb){
    
    cb(null, shortid.generate() + '-' + file.originalname);
  }
});
var upload = multer({storage: storage});


/* GET home page. */
router.get('/hieu', function(req, res, next) {
  Rooms.find({})
  .populate('hotelid')
  .exec((err, data) => {
    res.render('hieu', { Rooms: data });
  });
 });
 
 router.get('/loign', function(req, res, next) {
  Rooms.find({})
  .populate('hotelid')
  .exec((err, data) => {
    res.render('loign', { Rooms: data });
  });
 });


// rooms 
router.get('/', function(req, res, next) {
  Rooms.find({})
  .populate('hotelid')
  .exec((err, data) => {
    //res.json(data);
    res.render('index', { Rooms: data });
  });
 });
 
 // rooms 
router.get('/rooms/:cId', function(req, res, next) {
  Rooms.find({hotelid: req.params.cId}, (err, data) => {
    if(err){
      res.send('Id khong ton tai');
    }
       res.json(data);
  });
 });

 

// Room ADD
 router.post('/Rooms/save-add', upload.single('image'), async (req, res, next) => {
  var model = new Rooms();
  model.room_number = req.body.room_number;
  model.floor = req.body.floor;
  model.hotelid = req.body.hotelid;
  model.single_room = req.body.single_room;
  model.price = req.body.price;
  model.status = req.body.status;
  model.detail = req.body.detail;
  model.image = req.file.path.replace('public', '');
  var rs = await model.save();

  var hotels = await Hotels.findOne({_id: rs.hotelid.toString()});
  if(hotels.Rooms == undefined){
    hotels.Rooms = [];
  }
  hotels.Rooms.push({
    ho_id: rs._id,
    ho_name: model.name,
    ho_img: model.image
  });
  await hotels.save();
  res.redirect('/');
});

//Room edit 

router.get('/Rooms/edit/:pId', async (req, res, next) => {
  var hotels = await Hotels.find({});
  var rooms = await Rooms.findOne({_id: req.params.pId});

  for (let i = 0; i < hotels.length; i++) {
    if(hotels[i]._id == rooms.hotelid.toString()){
      hotels[i].selected = true;
      break;
    }
  }

  res.render('room/editRoom', {hotels: hotels, rooms: rooms});
});

//Room detail 
router.get('/Rooms/detail/:pId', async (req, res, next) => {
  var hotels = await Hotels.find({});
  var rooms = await Rooms.findOne({_id: req.params.pId});

  for (let i = 0; i < hotels.length; i++) {
    if(hotels[i]._id == rooms.hotelid.toString()){
      hotels[i].selected = true;
      break;
    }
  }

  res.render('room/detail', {hotels: hotels, rooms: rooms});
});



router.post('/Rooms/save-edit', upload.single('image'), (req, res, next) => {
  Rooms.findOne({_id: req.body.id}, (err, model) => {
    if(err){
      res.send('Id khong ton tai');
    }
      model.room_number = req.body.room_number;
      model.floor = req.body.floor;
      model.hotelid = req.body.hotelid;
      model.single_room = req.body.single_room;
      model.price = req.body.price;
      model.status = req.body.status;
      model.detail = req.body.detail;
    if(req.file != null){
      model.image = req.file.path.replace('public', '');
    }

    model.save((err) => {
      if(err){
        res.send('cap nhat khong thanh cong');
      }
    })
    res.redirect('/');
  });
});

// delete room
router.get('/Rooms/remove/:roomlId', function(req, res, next){
  Rooms.deleteOne({_id: req.params.roomlId}, function(err){
    //res.json(data);
     res.redirect('/');
  });
});



// hotes
router.get('/Hotel', function(req, res, next) {
  Hotels.find({}, function(err, data){
    //res.json(data);
    res.render('hotel', {Hotels: data});
  })
});

// hotes
router.get('/hotels', function(req, res, next) {
  Hotels.find({}, function(err, data){
    res.json(data);
    //res.render('hotel', {Hotels: data});
  })
});

// hotel Save ADD
router.post('/Hotels/save-add', upload.single('image'),function(req, res, next){
  var {name,city,address,owner,license_number,total_floor} = req.body;
  var image = req.file.path.replace('public', '');
  var model = new Hotels();
      model.name = name;
      model.image = image;
      model.city = city;
      model.address = address;
      model.owner = owner;
      model.license_number = license_number;
      model.total_floor = total_floor;
      model.save(function(err){
      res.redirect('/Hotel');
  });
});

// Update Hotel
router.get('/Hotels/edit/:cId', function(req, res, next){

  var cId = req.params.cId;

  Hotels.findOne({_id: cId}, function(err, data){
    if(err){
      res.send('id khong ton tai');
    }
    res.render('hotel/editHotel', {hotel: data});
  });

});

router.post('/Hotels/save-edit', upload.single('image'), function(req, res, next){
  
  // neu khong upload anh => req.file == null
  let {id,name,city,address,owner,license_number,total_floor} = req.body;
  Hotels.findOne({_id: id}, function(err, model){
    if(err){
      res.send('Id khong ton tai');
    }
      model.name = name;
      model.city = city;
      model.address = address;
      model.owner = owner;
      model.license_number = license_number;
      model.total_floor = total_floor;
    if(req.file != null){
      model.image = req.file.path.replace('public', '');
    }
    model.save(function(err){
      if(err){
        res.send('cap nhat khong thanh cong');
      }
      res.redirect('/Hotel');
    })
  })

});


// Update detail
router.get('/Hotels/detail/:cId', function(req, res, next){

  var cId = req.params.cId;

  Hotels.findOne({_id: cId}, function(err, data){
    if(err){
      res.send('id khong ton tai');
    }
    res.render('hotel/detail', {hotel: data});
  });

});


// Hotel Delete
router.get('/Hotels/remove/:hotelId', async (req, res, next)=>{
 await Hotels.deleteOne({_id: req.params.hotelId}, function(err){
  if(err){
    res.send('Xoa khong thanh cong');
  }
  res.redirect('/Hotel');
}
);
  await Rooms.deleteMany({hotelid: req.params.hotelId})
});
    




 // coment 
 router.get('/coment/:cId', function(req, res, next) {
  Coment.find({roomsid: req.params.cId}, (err, data) => {
    if(err){
      res.send('Id khong ton tai');
    }
       res.json(data);
  });
 });



 //  coment ADD
router.post('/coment/save-add', function(req, res, next){
  var model = new Coment();
  model.name = req.body.name;
  model.noidung  = req.body.noidung;
  model.roomsid = req.body.roomsid;

  model.save(function(err){
    res.redirect('/coment');
  });
});

// like

router.get('/likes/:cId', function(req, res, next) {
  likes.find({roomsid: req.params.cId}, (err, data) => {
    if(err){
      res.send('Id khong ton tai');
    }
       res.json(data);
  });
 });

// router.get('/likes', function(req, res, next) {
//   likes.find({}, function(err, data){
//     res.json(data);
//     //res.render('hotel', {Hotels: data});
//   })
// });

 //  coment ADD
 router.post('/likes/save-add', function(req, res, next){
  var model = new likes();
  model.namelike = req.body.namelike;
  model.namelike2  = req.body.namelike2;
  model.roomsid = req.body.roomsid;

  model.save(function(err){
    res.redirect('/likes');
  });
});



module.exports = router;
