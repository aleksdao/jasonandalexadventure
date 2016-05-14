var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Hangout = mongoose.model('Hangout');

router.param('id', function (req, res, next, id) {
  Hangout.findById(req.params.id)
    .then(function (foundHangout) {
      req.hangout = foundHangout;
      next();
    })
})

router.get('/', function (req, res, next) {
  Hangout.find({})
    .then(function (foundHangouts) {
      res.send(foundHangouts);
    })
})

router.get('/:id', function (req, res, next) {
  res.send(req.hangout);
})

router.put('/:id', function (req, res, next) {
  req.hangout.update(req.body, { new: true })
    .exec()
    .then(function (modifiedHangout) {
      res.send(modifiedHangout);
    })
})

router.post('/', function (req, res, next) {
  Hangout.create(req.body)
    .then(function (createdHangout) {
      res.send(createdHangout);
    })
})

router.delete('/:id', function (req, res, next) {
  req.hangout.remove()
    .then(function (removedHangout) {
      res.status(201).send(removedHangout);
    })
})

module.exports = router;
