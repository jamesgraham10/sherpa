'use strict';

let passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/users');

passport.use(new LocalStrategy({usernameField: 'email'},
  (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, {
        reason: 'incorrect user' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          reason: 'incorrect password'
        });
      }
      return done(null, user);
    });
  }
));
