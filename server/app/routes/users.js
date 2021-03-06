var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.param('id', function (req, res, next, id) {
  User.findById(req.params.id)
    .populate('reviews')
    .populate('dates')
    .populate('rides')
    .populate('potentials')
    .then(function (foundUser) {
      req.user = foundUser;
      next();
    })
})

router.get('/', function (req, res, next) {
  User.find({})
    .then(function (allUsers) {
      res.send(allUsers);
    })
})

router.get('/:id', function (req, res, next) {
  res.send(req.user);
})

router.get('/:id/like/:potentialId', function (req, res, next) {
  req.user.likes.push(req.params.potentialId);
  req.save()
    .then(function (currentUser) {
      return User.findById(req.params.potentialId)
    })
    .then(function (potentialMatchUser) {
      if (potentialMatchUser.likes.indexOf(currentUser._id) {
        return Hangout.create({
          firstUser: req.user._id,
          secondUser: potentialMatchUser._id,
          activity: findARandomActivity
        })
      })
    })
    .then(function (createdHangout) {
      res.send(createdHangout);
    })


})

router.get('/:id/dislike/:potentialId', function (req, res, next) {
  req.user.blocked.push(req.params.potentialId);
  req.save()
    .then(function (updatedUser) {
      res.sendStatus(200);
    })
})

router.get('/:id/reviews', function (req, res, next) {
  res.send(req.user.reviews);
})

router.get('/:id/rides', function (req, res, next) {
  res.send(req.user.rides);
})

router.get('/:id/dates', function (req, res, next) {
  res.send(req.user.dates);
})

router.get('/:id/potentials', function (req, res, next) {
  res.send(req.user.potentials);
})

router.post('/', function (req, res, next) {
  User.create(req.body)
    .then(function (createdUser) {
      res.send(createdUser);
    })
})

router.put('/:id', function (req, res, next) {
  req.user.update(req.body, { new: true })
    .then(function (updatedUser) {
      res.status(201).send(updatedUser);
    })
})

router.delete('/:id', function (req, res, next) {
  req.user.remove()
    .then(function (removedUser) {
      res.status(201).send(removedUser);
    })
})

module.exports = router;
