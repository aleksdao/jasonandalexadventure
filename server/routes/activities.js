var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Activity = mongoose.model('Activity');

router.param('id', function (req, res, next, id) {
  Activity.findById(req.params.id)
    .then(function (foundActivity) {
      req.activity = foundActivity;
      next();
    })
})

router.get('/', function (req, res, next) {
  Activity.find({})
    .then(function (allActivities) {
      res.send(allActivities);
    })
})

router.get('/:id', function (req, res, next) {
  res.send(req.activity);
})

router.post('/', function (req, res, next) {
  Activity.create(req.body)
    .then(function (createdActivity) {
      res.send(createdActivity);
    })
})

router.put('/:id', function (req, res, next) {
  req.activity.update(req.body, { new: true })
    .exec()
    .then(function (updatedActivity) {
      res.status(201).send(updatedActivity);
    })
})

router.delete('/:id', function (req, res, next) {
  req.activity.remove()
    .then(function (removedActivity) {
      res.status(201).send(removedActivity);
    })
})

module.exports = router;
