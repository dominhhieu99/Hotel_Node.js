var express = require('express');
var router = express.Router();

router.get('/addHotel', function(req, res, next){
  res.render('hotel/addHotel');
});
router.get('/editHotel', function(req, res, next){
  res.render('hotel/editHotel');
});
router.get('/deleteHotel', function(req, res, next){
  res.render('hotel/deleteHotel');
});
module.exports = router;
