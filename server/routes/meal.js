var express = require('express');
var router = express.Router();
var Trip = require('../models/trip');

router.put('/:id', function (req, res) {
  //console.log(req.body);
  Trip.findById(req.params.id, function (err, trip) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    trip.meals.push(req.body);
    trip.save(function (err) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(201);
    });
  });
});

router.delete('/:id/date/:id1', function (req, res) {
    Trip.findById(req.params.id, function (err, trip) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var doc = trip.meals.id(req.params.id1).remove();
    //console.log(doc);

    trip.save(function (err) {
      if (err) {
        //console.log(err);
        res.sendStatus(500);
        return;
      }

    res.sendStatus(204);
  });
  });
});

module.exports = router;
