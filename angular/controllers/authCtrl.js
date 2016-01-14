(function(){

  var app = angular.module('meanTodo');

  app.controller('authController', function ($http, $window, $state) {

    var authCtrl = this;
    authCtrl.test = "Hey!";

    authCtrl.login = function (user) {
      //console.log(user);
      $http.post('api/login', user)
        .then(function(response) {
          var token = response.data.token;
          $window.localStorage['meanTodoApiToken'] = token;
          $state.go('todos');
        }).catch(function(error) {
          if (error.data.reason === 'incorrect user') {
            user.email = '';
            user.password = '';
            authCtrl.error = "You enterred an incorrect e-mail or password";
          }
          if (error.data.reason === 'incorrect password') {
            user.password = '';
            authCtrl.error = "You enterred an incorrect password";
          }

        });
    };

    authCtrl.register = function (user) {
      //console.log(user);
      $http.post('api/register', user)
        .then(function(response) {
          var token = response.data.token;
          $window.localStorage['meanTodoApiToken'] = token;
          $state.go('todos');
        });
    };

    authCtrl.logout = function () {
      $window.localStorage['meanTodoApiToken'] = undefined;
      $state.go('login');
  };

});

})();
