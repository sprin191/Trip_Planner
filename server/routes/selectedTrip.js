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

router.delete('/:id', function (req, res) {
  Trip.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(204);
  });
});

module.exports = router;
