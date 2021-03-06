var express = require('express');
var router = express.Router();
var Trip = require('../models/trip');
var User = require('../models/user');

router.get('/:id', function (req, res) {
  Trip.find({ _id: req.params.id}, function (err, trip) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(trip);
  });
});

router.get('/:id/users', function (req, res) {
  var userData = {
    userArray : []
  };
  Trip.find({ _id: req.params.id}, function (err, trip) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    for (var i = 0; i < trip[0].users.length; i++) {
      User.find({_id: trip[0].users[i]}, function (err, user) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      userData.userArray.push(user[0]);
      if (userData.userArray.length === trip[0].users.length) {
      res.send(userData);
      }
    });
    }
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

router.delete('/:id/:userid', function (req, res) {
    //console.log('user id to pull: ', req.params.userid);
    Trip.update(
      { _id: req.params.id },
      { $pull: { users: req.params.userid } },
      { multi: true },
      function(err, rawResponse) {
        if(err) {
          //console.log('error removing user ', err);
        }
        res.sendStatus(204);
      }
    );
  });

router.put('/:id/email', function (req, res) {
  User.find({ email: req.body.email }, function (err, user) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    if (user.length === 0) {
      res.send({error: "E-mail not found."});
      return;
    }
    Trip.findById(req.params.id, function (err, trip) {
      if (err) {
        res.sendStatus(500);
        return;
      }
    trip.users.push(user[0]._id);
    trip.save(function (err) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.sendStatus(204);
  });
});
});
});

module.exports = router;
