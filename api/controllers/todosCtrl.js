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
      if (err) { sendJSONResponse(res, 400, { "reason" : "Todos not found" });
    } else {
      let userData = {
        mission : user.mission,
        todos   : user.todos
      };
      sendJSONResponse(res, 200, userData);
    }
    });
  } else { sendJSONResponse(res, 404, { "reason" : "User not found" }); }
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
        if (err) { sendJSONResponse(res, 400, { "reason" : "Todo could not be created" }); }
        else { sendJSONResponse(res, 201, user.todos); };
      });
    });
  } else {
    sendJSONResponse(res, 404, {"reason" : "User not found" });
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
    else { sendJSONResponse(res, 404, { "reason" : "User not found!"}); }
  });
};

todosCtrl.assignMission = (req, res) => {
  let userId = req.token._id,
      todoId = req.params.todoid,
      // if Todo hasMission is true, we want to unassign it
      addMission = req.body.hasMission;

  User.findById(userId, (err, user) => {
    if (err) { sendJSONResponse(res, 400, { "reason" : "User not found" }); }
    else {
      user.todos.forEach( (todo) => {
        if (todo.id === todoId) {
          if (addMission === true) {
            todo.hasMission = true;
            todo.mission = user.mission[0]._id;
            user.mission[0].todos.push(todo.id);
          } else {
            todo.hasMission = false;
            todo.mission = undefined;
            let missionTodos = user.mission[0].todos;
            user.mission[0].todos = missionTodos.filter( (todo) => {
              return todo != todoId;
            });
          }
        }
      });
      user.save( (err, user) => {
        if (err) { sendJSONResponse(res, 400, { "reason" : "Todo could not be saved!"}); }
        else {
          let userData = {
            mission : user.mission,
            todos   : user.todos
          };
          sendJSONResponse(res, 201, userData);
        }
      });
    }
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
        todo.completed = req.body.completed;
        todo.completedAt = req.body.completedAt;
      }
    });
    user.save( (err, user) => {
      if (err) { sendJSONResponse(res, 400, { "reason" : "Todo could not be saved!"}); }
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
        todo.archivedAt = Date.now();
        todo.dropped = true;
        user.todosArchive.push(todo);
      }
    })
    user.todos = user.todos.filter( (todo) => {
      return todo.id !== todoId;
    });
    user.save( (err, user) => {
      if (err) { sendJSONResponse(res, 400, { "reason" : "Todo could not be deleted!"}); }
      else { sendJSONResponse(res, 201, user.todos); };
    });
  });
};

module.exports = todosCtrl;
