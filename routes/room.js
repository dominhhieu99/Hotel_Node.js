var express = require('express');
var router = express.Router();
var Hotels = require('../models/hotels');
var Rooms = require('../models/rooms');

router.get('/addRoom', async(req, res, next) =>{
  var hotels = await Hotels.find({});
 // res.json(hotels);
  res.render('room/addRoom',{hotels: hotels});
});
router.get('/editRoom', function(req, res, next){
  Hotels.find({}, function(err,data){
  //res.json(data);
  res.render('room/editRoom',{hotels: data});
  }); 
});
router.get('/editRoom', function(req, res, next){
  Hotels.find({}, function(err,data){
  //res.json(data);
  res.render('room/editRoom',{hotels: data});
  }); 
});
  router.get('/deleteRoom', function(req, res, next){
  res.render('room/deleteRoom');
});

module.exports = router;
