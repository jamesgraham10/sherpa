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

  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONResponse(res, 400, { "message" : "All fields required" });
    return;
  }

  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save( (err) => {
    let token;
    if (err) { sendJSONResponse(res, 404, err); }
    else {
      token = user.generateJwt();
      sendJSONResponse(res, 200, { "token" : token });
    }
  });
};

authCtrl.login = (req, res) => {
  console.log(req.body);
};

module.exports = authCtrl;
