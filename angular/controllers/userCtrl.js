(function(){
  var app = angular.module('meanTodo');

  app.controller('userController', function($window, $state) {

    var userCtrl = this;

    userCtrl.logout = function () {
      delete $window.localStorage.apiConfig;
      $state.go('auth');
  };

  });
}());
