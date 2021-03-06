const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
  function(email, password, done) {
    User.findOne({ email: email, isDeleted: false }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Invalid email.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


const express = require('express');
const ctrl = require('./controller');

// const isPerson = require('../../middlewares/isPerson');

const router = express.Router();

router.route('/login')
  .post(ctrl.login);
router.route('/forgot-password')
  .post(ctrl.forgot);
router.route('/reset-password/:token')
  .get(ctrl.reset);


module.exports = router;