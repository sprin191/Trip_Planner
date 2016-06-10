var express = require('express');
var router = express.Router();
var Trip = require('../models/trip');

router.get('/:id', function (req, res) {
  Trip.find({ _id: req.params.id}, function (err, trip) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(trip);
  });
});

router.put('/:id', function (req, res) {
  console.log(req.body);
  Trip.findById( req.params.id, function (err, trip) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    trip.costs.push(req.body);
    trip.save(function (err) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(201);
    });
  });
});

module.exports = router;
