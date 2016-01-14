(function(){

    var app = angular.module('meanTodo');

    app.factory('Token', function($q, $window) {

      return { isPresent }

      function isPresent () {

        var deferred = $q.defer();

        if ($window.localStorage['meanTodoApiToken'] != 'undefined') {
          deferred.resolve("User is currently signed in");
        }
        else  {
          deferred.reject("Not currently signed in.");
      }

        return deferred.promise;

      };

    });


})();
