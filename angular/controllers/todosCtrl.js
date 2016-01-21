(function(){

  var app = angular.module('meanTodo');

  app.controller('todosController', function (Todo, Mission, $http, $window, $state) {
    var todosCtrl = this;

    var apiConfig = JSON.parse($window.localStorage.apiConfig);

    todosCtrl.missionRequiresCheckout = false;

    Todo.fetch(apiConfig)
      .then(function(response) {
        console.log(response);
        if (!response.mission[0]) {
          todosCtrl.missionActive = false;
          todosCtrl.mission = {}; }
        else {
          todosCtrl.mission = response.mission[0];
          todosCtrl.missionActive = true;
        }
        todosCtrl.todos = response.todos;
      }).catch(function(err){
        todosCtrl.error = err;
      });

    todosCtrl.createTodo = function(todo) {
      Todo.create(todo, apiConfig)
        .then(function(todos) {
          todo.todo = '';
          todosCtrl.todos = todos;
        }).catch(function(err){
          todosCtrl.error = err;
        });
    };

    todosCtrl.deleteTodo = function(todo) {
      Todo.remove(todo, apiConfig)
        .then(function(todos) {
          todosCtrl.todos = todos;
        }).catch(function(err){
          todosCtrl.error = err;
        });
    };

    todosCtrl.completeTodo = function(todo) {
      if (todo.completed === true) {
        todo.completedAt = Date.now();
      } else {
        todo.completedAt = '';
      }
      todosCtrl.saveTodo(todo);
    }

    todosCtrl.saveTodo = function(todo) {
      Todo.save(todo, apiConfig)
        .then(function(todos){
          console.log(todos);
          todosCtrl.todos = todos;
        })
        .catch(function (err) {
          todosCtrl.error = err;
        });
    }

    todosCtrl.toggleMissionAssign = function(todo) {
      todo.hasMission === true ? todo.hasMission = false : todo.hasMission = true;
      Todo.assignMission(todo, apiConfig)
        .then(function (response) {
          todosCtrl.todos = response.todos;
          todosCtrl.mission = response.mission[0];
        }).catch(function (err) {
          todosCtrl.error = err;
        });
    }

    todosCtrl.createMission = function(mission) {

      Mission.create(mission, apiConfig)
        .then(function(mission) {
          todosCtrl.missionActive = true;
          todosCtrl.mission = mission;
        }).catch(function(err){
          todosCtrl.error = err;
        });
    }

    todosCtrl.saveMission = function(mission) {
      Mission.save(mission, apiConfig)
      .then(function(){})
      .catch(function (err) {
        todosCtrl.error = err;
      });
    }

    todosCtrl.deleteMission = function(mission) {
      var deleteTodosForMission = confirm("Deleting your mission will delete any associated todos");
      if (deleteTodosForMission) {
      Mission.remove(mission, apiConfig)
        .then(function(response) {
          todosCtrl.todos = response.todos;
          todosCtrl.mission = response.mission;
        }).catch(function(err){
          todosCtrl.error = err;
        });
      } else {
        return;
      }
    }

    todosCtrl.completeMission = function(mission) {
      console.log(todosCtrl.todos);
      var remainingMissionTodos = todosCtrl.todos.filter(function (todo) {
        return todo.hasMission && !todo.completed;
      });
      if (remainingMissionTodos != false) {
        todosCtrl.remainingMissionTodos = remainingMissionTodos;
        todosCtrl.missionRequiresCheckout = true;
      } else {
        Mission.complete(mission, apiConfig)
          .then(function (response) {
            todosCtrl.todos = response.todos;
            todosCtrl.mission = {};
            todosCtrl.missionActive = false;
            todosCtrl.missionRequiresCheckout = false;
          })
          .catch(function (err) {
            todosCtrl.error = err;
          });
        }
    };

    todosCtrl.checkoutMission = function (todos, mission) {
      var remaining = todosCtrl.remainingMissionTodos.filter(function (todo) {
          return todo.hasMission && !todo.completed;
      });
      if (remaining != false) {
        alert("You must complete all todos before continuing");
      } else {
        Mission.complete(mission, apiConfig)
          .then(function (response) {
            todosCtrl.remainingMissionTodos = '';
            todosCtrl.todos = response.todos;
            todosCtrl.mission = {};
            todosCtrl.missionActive = false;
            todosCtrl.missionRequiresCheckout = false;
          })
          .catch(function (err) {
            todosCtrl.error = err;
          });
      }
    };

  // end of controller
  });
// end of iffy
})();
