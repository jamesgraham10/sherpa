'use strict';

let mongoose  = require('mongoose'),
    User      = require('../models/users'),
    missionCtrl = {};


function sendJSONResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

// Create a todo
missionCtrl.create = (req, res) => {
  console.log(req.body);

  if (req.token._id) {
    let userId = req.token._id;
    User.findById(userId, (err, user) => {
      if (user.mission[0] != undefined) {
        sendJSONResponse(res, 400, { "reason" : "Cannot save more than one mission" });
      } else {
        user.mission.push({
          mission : req.body.mission
        });
        user.save( (err, user) => {
          if (err) { sendJSONResponse(res, 400, { "reason" : "Mission could not be created" }); }
          else { sendJSONResponse(res, 201, user.mission[0]); };
        });
      }
    });
  } else {
    sendJSONResponse(res, 404, {"reason" : "User not found" });
  }
};

//Update a Todo
missionCtrl.update = (req, res) => {
  let userId = req.token._id;

  User.findById(userId, (err, user) => {
    user.mission[0].mission = req.body.mission;
    user.save( (err, user) => {
      if (err) { sendJSONResponse(res, 400, { "reason" : "Mission could not be saved!"}); }
      else { sendJSONResponse(res, 201, user.mission[0]); };
    });
  });

};

// Delete a Todo
missionCtrl.delete = (req, res) => {
  let userId = req.token._id;

  User.findById(userId, (err, user) => {
    user.todos.forEach(function (todo) {
        if (todo.mission == user.mission[0]._id) {
          todo.archivedAt = Date.now();
          todo.dropped = true;
          user.todosArchive.push(todo);
        }
    });
    user.todos = user.todos.filter(function (todo) {
        return todo.mission != user.mission[0]._id;
    });
    user.mission[0].abandoned = true;
    user.mission[0].archivedAt = Date.now();
    user.mission[0].abandonedAt = Date.now();
    user.missionArchive.push(user.mission[0]);
    user.mission.pop();
    user.save( (err, user) => {
      if (err) { sendJSONResponse(res, 400, { "reason" : "Mission could not be deleted!"}); }
      else {
        let userData = {
          todos: user.todos,
          mission: user.mission
        }
        sendJSONResponse(res, 201, userData);
      }
    });
  });
};

// Checkout Mission

missionCtrl.checkout = (req, res) => {
  let userId = req.token._id;

  User.findById(userId, (err, user) => {
    console.log(user.mission[0]);
    user.todos.forEach(function (todo) {
        if (todo.mission == user.mission[0]._id) {
          todo.archivedAt = Date.now();
          user.todosArchive.push(todo);
        }
    });
    user.todos = user.todos.filter(function (todo) {
        return todo.mission != user.mission[0]._id;
    });
    user.mission[0].archivedAt = Date.now();
    user.mission[0].completed = true;
    user.mission[0].completedAt = Date.now();
    user.missionArchive.push(user.mission[0]);
    user.mission.pop();

    user.save( (err, user) => {
      if (err) {
        console.log(err);
        sendJSONResponse(res, 400, { "reason" : "Mission could not checkout!"}); }
      else {
        console.log("hello");
        let userData = {
          todos: user.todos,
          mission: user.mission
        }
        sendJSONResponse(res, 201, userData);
      };
    });
  });
}

module.exports = missionCtrl;
