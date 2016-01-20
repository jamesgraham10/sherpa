'use strict';

let mongoose = require('mongoose'),
    passport = require('passport'),
    authCtrl = {},
    User     = require('../models/users');

function sendJSONResponse (res, status, content) {
  res.status(status);
  res.json(content);
}

authCtrl.register = (req, res) => {
  console.log(req.body);

  if(!req.body.email || !req.body.password) {
    sendJSONResponse(res, 400, { "message" : "All fields required" });
    return;
  }

  let user = new User({
    email: req.body.email,
  });

  user.setPassword(req.body.password);

  user.save( (err) => {
    let token;
    if (err) {
      console.log(err);
      sendJSONResponse(res, 404, err); }
    else {
      token = user.generateJwt();
      sendJSONResponse(res, 200, { "user" : {
        email: user.email,
        id: user._id,
        token: token
      }
    } );
    }
  });
};

authCtrl.login = (req, res) => {
  if(!req.body.email || !req.body.password) {
    sendJSONResponse(res, 400, { "message" : "All fields required" });
    return;
  }

  passport.authenticate('local', (err, user, info) => {
    let token;
    if (err) { sendJSONResponse(res, 404, err); }
    if (user) {
      token = user.generateJwt();
      sendJSONResponse(res, 200, { "user" : {
          email: user.email,
          id: user._id,
          token: token
      }
      });
    } else {
      sendJSONResponse(res, 401, info);
    }
  })(req, res);
};

module.exports = authCtrl;
