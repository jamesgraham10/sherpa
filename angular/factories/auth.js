(function(){

    var app = angular.module('meanTodo');

    app.factory('Auth', function($q, $window, $state) {

      return {
        isPresent : isPresent,
        apiConfig : $window.localStorage.apiConfig
       }

      function isPresent () {

        var deferred = $q.defer();

        if ($window.localStorage.apiConfig) {
              deferred.resolve('JWT valid');
            } else  {
          deferred.reject("User not authenticated.");
        }
        return deferred.promise;
      };
    });


})();
