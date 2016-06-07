var express = require('express');
var router = express.Router();
var Trip = require('../models/trip');

router.post('/', function (req, res) {

console.log("made it here");
  var trip = new Trip(req.body);
  trip.users = req.user.id;
  console.log("post success");
  trip.save(function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(201);
  });
});

router.get('/', function (req, res) {
  Trip.find({ users: req.user._id}, function (err, trips) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(trips);
  });
});

module.exports = router;
