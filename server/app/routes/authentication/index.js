var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


passport.use(new FacebookStrategy({
  clientID: '522937847907615',
  clientSecret: '2249181b3bc08cac5a15ae3027fa9169',
  callbackURL: 'http://127.0.0.1:5000/auth/facebook/callback',
  profileFields: ["id", "birthday","first_name","email", "last_name", "gender", "picture.width(200).height(200)"]
},
  function (accessToken, refreshToken, profile, done) {
    User.findOne({ email : profile.emails[0].value })
      .exec()
      .then(function (foundFbUser) {
        if (foundFbUser) {
          console.log('we found a user', foundFbUser);
          foundFbUser.facebook.id = profile.id
          return foundFbUser.save();
          }
          else {
            console.log('profile here', profile);
            return User.create({
                email : profile.emails[0].value,
                facebook: {
                    id: profile.id
                }
            });
          }
      })
      .then(function (userToLogin) {
        done(null, userToLogin);
      })
      .catch(function (err) {
        console.error('Error creating user from Facebook authentication', err);
        done(err);
      })
  }
));



router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

router.get('/facebook/callback',
  passport.authenticate(('facebook'), { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
});

module.exports = router;
