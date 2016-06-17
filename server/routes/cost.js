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

router.put('/:_id/category/:id/item', function (req, res) {
  //console.log(req.body);
  //console.log(req.params);
  Trip.findById(req.params._id, function (err, trip) {
    if (err) {
      //console.log(err);
      res.sendStatus(500);
      return;
    }

    var doc = trip.costs.id(req.params.id);
    //console.log(doc);
    doc.items.push(req.body);

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

router.delete('/:id/category/:id1', function (req, res) {
    Trip.findById(req.params.id, function (err, trip) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var doc = trip.costs.id(req.params.id1).remove();
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

router.delete('/:_id/category/:id1/item/:id2', function (req, res) {
    Trip.findById(req.params._id, function (err, trip) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var doc = trip.costs.id(req.params.id1).items.id(req.params.id2).remove();
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
