var express = require('express');
var router = express.Router();
var Trip = require('../models/trip');

router.put('/:id', function (req, res) {
  //console.log(req.body);
  Trip.findById( req.params.id, function (err, trip) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    trip.itinerary.push(req.body);
    trip.save(function (err) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(201);
    });
  });
});

router.put('/:_id/date/:id/item/', function (req, res) {
  //console.log(req.body);
  //console.log(req.params);
  Trip.findById(req.params._id, function (err, trip) {
    if (err) {
      //console.log(err);
      res.sendStatus(500);
      return;
    }

    var doc = trip.itinerary.id(req.params.id);
    //console.log(req.body);
    doc.activities.push(req.body);

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


router.delete('/:id/date/:id1', function (req, res) {
    Trip.findById(req.params.id, function (err, trip) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var doc = trip.itinerary.id(req.params.id1).remove();
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

router.delete('/:_id/date/:id1/item/:id2', function (req, res) {
    Trip.findById(req.params._id, function (err, trip) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var doc = trip.itinerary.id(req.params.id1).activities.id(req.params.id2).remove();
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
