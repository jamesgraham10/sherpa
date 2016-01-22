(function(){

    var app = angular.module('meanTodo');

    app.factory('Todo', function($window, $http, $q) {

      return {
        fetch  : fetch,
        create : create,
        save   : save,
        assignMission : assignMission,
        remove : remove,
        sweep  : sweep
      }

      function fetch (apiConfig) {
        var deferred = $q.defer();

        $http.get('/api/todos', apiConfig)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (err) {
            deferred.reject(err);
          });
        return deferred.promise;
      };

      function create (todo, apiConfig) {
        var deferred = $q.defer();

        $http.post('/api/todos', todo, apiConfig)
          .then(function (response) {
            deferred.resolve(response.data);
          }).catch(function(err) {
            deferred.resolve(error.data.reason);
          });
        return deferred.promise;
      };

      function save (todo, apiConfig) {
        var deferred = $q.defer();

        $http.put('/api/todos/' + todo._id, todo, apiConfig)
          .then(function (response) {
            deferred.resolve(response.data);
          }).catch(function(error) {
            deferred.reject(error.data.reason);
          });
      return deferred.promise;
      };

      function assignMission (todo, apiConfig) {
        var deferred = $q.defer();

        $http.put('/api/todos/mission/' + todo._id, todo, apiConfig)
          .then(function (response) {
            deferred.resolve(response.data);
          }).catch(function(error) {
            deferred.reject(error.data.reason);
          });
      return deferred.promise;
      }

      function remove (todo, apiConfig) {
        var deferred = $q.defer();

        $http.delete('/api/todos/' + todo._id, apiConfig)
          .then(function (response) {
            deferred.resolve(response.data);
          }).catch(function(error) {
            deferred.reject(error.data.reason);
          });
        return deferred.promise;
      };

      function sweep (todosToSweep, apiConfig) {
        var deferred = $q.defer();

        $http.put('/api/todos', todosToSweep, apiConfig)
          .then(function (response) {
            deferred.resolve(response.data);
          })
          .catch(function (err) {
            deferred.reject(error.data.reason);
          });

        return deferred.promise;
      };

    });
})();
