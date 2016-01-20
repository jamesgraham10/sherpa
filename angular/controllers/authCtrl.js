(function(){

  var app = angular.module('meanTodo');

  app.controller('authController', function ($rootScope, $http, $window, $state) {

    var authCtrl = this;

    authCtrl.login = function (user) {

      $http.post('api/login', user)
        .then(function(response) {
          var user = response.data.user;
          // Storing API Auth Config for User
          var config = {
            headers: { Authorization: 'Bearer ' + user.token }
          };
          $window.localStorage['apiConfig'] = JSON.stringify(config);
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

      $http.post('api/register', user)
        .then(function(response) {
          var user = response.data.user;
          var config = {
            headers: { Authorization: 'Bearer ' + user.token }
          };
          $window.localStorage['apiConfig'] = JSON.stringify(config);
          $state.go('todos');
        });
    };
});

})();
