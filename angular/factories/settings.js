(function(){

    var app = angular.module('meanTodo');

    app.factory('Settings', function($q, $window, $http) {

      return {
        saveSettings : saveSettings
      }

      function saveSettings (settings) {

        var config = {
          headers: { Authorization: 'Bearer ' + $window.localStorage['userToken'] }
        };


        var deferred = $q.defer();

        $http.put('api/user/settings', settings, config)
          .then(function (response) {
            deferred.resolve(response);
          })
          .catch(function (err) {
            deferred.reject(err);
          })
          return deferred.promise;
      }

    });
})();
