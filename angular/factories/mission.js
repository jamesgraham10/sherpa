(function(){

    var app = angular.module('meanTodo');

    app.factory('Mission', function($window, $http, $q) {

      return {
        create : create,
        save   : save,
        remove : remove,
        complete : complete
      }

      function create (mission, apiConfig) {
        var deferred = $q.defer();
        console.log(mission);
        $http.post('/api/mission', mission, apiConfig)
          .then(function (response) {
            deferred.resolve(response.data);
          }).catch(function(err) {
            console.log(err);
            deferred.resolve(err.data.reason);
          });
        return deferred.promise;
      };

      function save (mission, apiConfig) {
        var deferred = $q.defer();

        $http.put('/api/mission/save', mission, apiConfig)

          .then(function (response) {
            deferred.resolve('Mission saved');
          }).catch(function(error) {
            deferred.reject(error.data.reason);
          });
      return deferred.promise;
      };

      function remove (mission, apiConfig) {
        var deferred = $q.defer();

        $http.delete('/api/mission', apiConfig)
          .then(function (response) {
            deferred.resolve(response.data);
          }).catch(function(error) {
            deferred.reject(error.data.reason);
          });
        return deferred.promise;
      };

      function complete (mission, apiConfig) {
        var deferred = $q.defer();

        $http.put('/api/mission/checkout', mission, apiConfig)
          .then(function (response) {
            deferred.resolve(response.data);
          }).catch(function(error) {
            deferred.reject(error.data.reason);
          });
        return deferred.promise;
      };

    });
})();
