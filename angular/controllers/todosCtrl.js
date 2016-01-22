(function(){

  var app = angular.module('meanTodo');

  app.controller('todosController', function (Todo, Mission, $http, $window, $state) {
    var todosCtrl = this;

    var apiConfig = JSON.parse($window.localStorage.apiConfig);

    //todosCtrl.missionRequiresCheckout = false;
    function checkReaminingMissionTodos (todosArray) {
      var remainingTodos = todosArray.filter(function (todo) {
        return todo.hasMission && !todo.completed;
      });
      return Boolean(remainingTodos.length);
    };

    Todo.fetch(apiConfig)
      .then(function(response) {
        todosCtrl.todos = response.todos;
        if (!response.mission[0]) {
          todosCtrl.missionActive = false;
          todosCtrl.mission = {}; }
        else {
          todosCtrl.mission = response.mission[0];
          todosCtrl.missionActive = true;
          todosCtrl.missionTodosReamining = checkReaminingMissionTodos(todosCtrl.todos);
        }

      }).catch(function(err){
        todosCtrl.error = err;
      });

    // todosCtrl.createTodo = function(todo) {
    //   Todo.create(todo, apiConfig)
    //     .then(function(todos) {
    //       todo.todo = '';
    //       todosCtrl.todos = todos;
    //     }).catch(function(err){
    //       todosCtrl.error = err;
    //     });
    // };

    todosCtrl.createBlankTodo = function() {
      var todo = { todo: '' };
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
        .then(function(response) {
          todosCtrl.todos = response.todos;
          todosCtrl.mission = response.mission[0];
          console.log(todosCtrl.mission);
          todosCtrl.missionTodosReamining = checkReaminingMissionTodos(todosCtrl.todos);
        }).catch(function(err){
          todosCtrl.error = err;
        });
    };

    todosCtrl.completeTodo = function(todo) {
      if (todo.completed === true) {
        todo.completed = false;
        todo.completedAt = Date.now();
      } else {
        todo.completed = true;
        todo.completedAt = '';
      }
      todosCtrl.saveTodo(todo);
    }

    todosCtrl.saveTodo = function(todo) {
      Todo.save(todo, apiConfig)
        .then(function(todos){
          todosCtrl.todos = todos;
          todosCtrl.missionTodosReamining = checkReaminingMissionTodos(todosCtrl.todos);
        })
        .catch(function (err) {
          todosCtrl.error = err;
        });
    }

    todosCtrl.sweepCompletedTodos = function (todos) {
      var todosToSweep = todosCtrl.todos.filter(function (todo) {
        return todo.completed === true;
      });
      Todo.sweep(todosToSweep, apiConfig)
        .then(function (response) { todosCtrl.todos = response; })
        .catch(function (err) { todosCtrl.error = error; });
    };

    todosCtrl.toggleMissionAssign = function(todo) {
      todo.hasMission === true ? todo.hasMission = false : todo.hasMission = true;
      Todo.assignMission(todo, apiConfig)
        .then(function (response) {
          todosCtrl.todos = response.todos;
          todosCtrl.missionTodosReamining = checkReaminingMissionTodos(todosCtrl.todos);
          todosCtrl.mission = response.mission[0];
        }).catch(function (err) {
          todosCtrl.error = err;
        });
    }

    todosCtrl.createMission = function(mission) {

      Mission.create(mission, apiConfig)
        .then(function(mission) {
          $state.go('todos');
          todosCtrl.mission = mission;
          todosCtrl.missionActive = true;
        }).catch(function(err){
          todosCtrl.error = err;
        });
    }

    todosCtrl.saveMission = function(mission) {
      Mission.save(mission, apiConfig)
      .then(function(){
        todosCtrl.missionEditMode = false;
      })
      .catch(function (err) {
        todosCtrl.error = err;
      });
    }

    todosCtrl.deleteMission = function(mission) {
      if (mission.todos.length) {
        var deleteTodosForMission = confirm("Deleting your mission will drop any associated todos");
        deleteTodosForMission === true ? deleteMission(mission) : false;
      } else {
        deleteMission(mission);
      }

      function deleteMission(mission) {
        Mission.remove(mission, apiConfig)
          .then(function(response) {
            todosCtrl.todos = response.todos;
            todosCtrl.mission = {};
            todosCtrl.missionActive = false;
          }).catch(function(err){
            todosCtrl.error = err;
          });
      }
    }

    todosCtrl.completeMission = function(mission) {
      if (todosCtrl.remainingMissionTodos !== false) {
        Mission.complete(mission, apiConfig)
          .then(function (response) {
            todosCtrl.todos = response.todos;
            todosCtrl.mission = {};
            todosCtrl.missionActive = false;
          })
          .catch(function (err) {
            todosCtrl.error = err;
          });
        }
    };

    todosCtrl.getEmptyMessage = function() {

      var messages = [
        "* tumbleweeds  *",
        "oh look! paint drying.",
        "elephant in the room",
        "[todos go here]...",
        "ummmm...",
        "i think it's gonna be a while",
        "my friend, abyss",
        "the good, the bad, the empty"
      ]
      todosCtrl.emptyMessage = messages[Math.floor(Math.random() * messages.length)];
    }
  // end of controller
  });
// end of iffy
})();
