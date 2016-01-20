(function(){

  var app = angular.module('meanTodo');

  app.controller('todosController', function (Auth, Todo, $http, $window, $state) {
    var todosCtrl = this;

    var apiConfig = JSON.parse(Auth.apiConfig);

    Todo.fetch(apiConfig)
      .then(function(todos) {
        todosCtrl.todos = todos;
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
        .then(function(){})
        .catch(function (err) {
          todosCtrl.error = err;
        });
    }
  // end of controller
  });
// end of iffy
})();
