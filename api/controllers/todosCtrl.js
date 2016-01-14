'use strict';

let mongoose  = require('mongoose'),
    User      = require('../models/users'),
    todosCtrl = {};


function sendJSONResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

// Fetch all todos
todosCtrl.fetch = (req, res) => {

  if (req.token._id) {
    let userId = req.token._id;
    User.findById(userId, (err, user) => {
      if (err) { sendJSONResponse(res, 400, err); }
      else { sendJSONResponse(res, 200, user.todos); }
    });
  } else { sendJSONResponse(res, 404, { "message" : "User not found" }); }
};

// Create a todo
todosCtrl.create = (req, res) => {

  if (req.token._id) {
    let userId = req.token._id;
    User.findById(userId, (err, user) => {
      user.todos.push({
        todo: req.body.todo
      });
      user.save( (err, user) => {
        if (err) { sendJSONResponse(res, 400, err); }
        else { sendJSONResponse(res, 201, user.todos); };
      });
    });
  } else {
    sendJSONResponse(res, 404, {"message" : "User not found" });
  }
};

// Fetch a Todo
todosCtrl.fetchOne = (req, res) => {
  let userId = req.token._id,
      todoId = req.params.todoid;

  User.findById(userId, (err, user) => {
    let todo = user.todos.filter( (todo) => {
      return todo.id === todoId;
    });
    if (todo) { sendJSONResponse(res, 200, todo) }
    else { sendJSONResponse(res, 404, { "message" : "Todo not found!"}); }
  });
};

//Update a Todo
todosCtrl.update = (req, res) => {
  let userId = req.token._id,
      todoId = req.params.todoid;

  User.findById(userId, (err, user) => {
    user.todos.forEach( (todo) => {
      if (todo.id === todoId) {
        todo.todo = req.body.todo;
      }
    });
    user.save( (err, user) => {
      if (err) { sendJSONResponse(res, 400, err); }
      else { sendJSONResponse(res, 201, user.todos); };
    });
  });
  };

// Delete a Todo
todosCtrl.delete = (req, res) => {
  let userId = req.token._id,
      todoId = req.params.todoid;

  User.findById(userId, (err, user) => {
    user.todos.forEach( (todo) => {
      if (todo.id === todoId) {
        let deletePos = user.todos.indexOf(todo);
        user.todos.splice(deletePos, deletePos + 1);
      }
    });
    user.save( (err, user) => {
      if (err) { sendJSONResponse(res, 400, err); }
      else { sendJSONResponse(res, 201, user.todos); };
    });
  });
};


module.exports = todosCtrl;
