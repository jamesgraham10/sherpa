'use strict';

let mongoose = require('mongoose'),
    passport = require('passport'),
    userCtrl = {},
    User     = require('../models/users');

function sendJSONResponse (res, status, content) {
  res.status(status);
  res.json(content);
}

  userCtrl.find = (req, res) => {
    if (req.token._id) {
      let userId = req.token._id;
      User.findById(userId, (err, user) => {
        if (err) { sendJSONResponse(res, 400, { "reason" : "User not found" }); }
        else { sendJSONResponse(res, 200, {
          _id : user._id,
          email: user.email,
          todos: user.todos
        }); }
      });
    } else { sendJSONResponse(res, 404, { "reason" : "Token invalid." }); }
    };

module.exports = userCtrl;
