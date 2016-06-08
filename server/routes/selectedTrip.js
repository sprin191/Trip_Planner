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

module.exports = router;
