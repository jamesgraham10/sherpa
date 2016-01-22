(function(){

  var app = angular.module('meanTodo', ['ui.router']);

  app.config(function($urlRouterProvider, $stateProvider, $locationProvider) {

      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('todos', {
            url: '/',
            resolve: {
              auth: function ($state, Auth) {
                return Auth.isPresent().then(function (authState) {
                  console.log(authState);
                }).catch(function(unauthenticated){
                    $state.go('auth');
                });
              }
            },
            controller: 'todosController as todosCtrl',
            templateUrl: 'partials/todos'
        })
        .state('todos.newMisison', {
            url: '',
            templateUrl: 'partials/mission'
        })
        .state('reports', {
          url: '/reports',
          resolve: {
            auth: function ($state, Auth) {
              return Auth.isPresent().then(function (authState) {
                console.log(authState);
              }).catch(function(unauthenticated){
                  $state.go('auth');
              });
            }
          },
          controller: 'reportsController as reportsCtrl',
          templateUrl: 'partials/reports'
        })
        .state('journey', {
          url: '/journey',
          resolve: {
            auth: function ($state, Auth) {
              return Auth.isPresent().then(function (authState) {
                console.log(authState);
              }).catch(function(unauthenticated){
                  $state.go('auth');
              });
            }
          },
          controller: 'journeyController as journeyCtrl',
          templateUrl: 'partials/journey'
        })
        .state('auth', {
          url: '/login',
          templateUrl: 'partials/auth',
          controller: 'authController as authCtrl'
        });
    });
})();
