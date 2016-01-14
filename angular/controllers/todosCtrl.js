(function(){

  var app = angular.module('meanTodo');

  app.controller('todosController', function($http, $window) {
    var todosCtrl = this;

    var config = {
      headers: { Authorization: 'Bearer ' + $window.localStorage.meanTodoApiToken }
    };

    $http.get('/api/todos', config)
      .then(function (response) {
        var todos = response.data;
        todosCtrl.todos = todos;
      }).catch(function(error) {
        todosCtrl.error = error.data.reason;
      });

      todosCtrl.createTodo = function(todo) {
        $http.post('/api/todos', todo, config)
          .then(function (response) {
            todo.todo = '';
            var todos = response.data;
            todosCtrl.todos = todos;
          }).catch(function(error) {
            todosCtrl.error = error.data.reason;
          });
      };

      todosCtrl.deleteTodo = function(todo) {
        console.log(todo);
        $http.delete('/api/todos/' + todo._id, config)
          .then(function (response) {
            var todos = response.data;
            todosCtrl.todos = todos;
          }).catch(function(error) {
            todosCtrl.error = error.data.reason;
          });
      };

      var lastNow = 0;
      todosCtrl.saveTodo = function(todo) {
        // Todo save every few seconds

        // if (lastNow + 2000 <= Date.now()) {
        //   lastNow = Date.now();
          $http.put('/api/todos/' + todo._id, todo, config)
            .then(function (response) {
              //var todos = response.data;
              //todosCtrl.todos = todos;
            }).catch(function(error) {
              todosCtrl.error = error.data.reason;
            });
        // } else {
        //   return;
        // }


      };

    });

})();
