(function(){

  var app = angular.module('meanTodo', ['ui.router']);

  app.config(function($urlRouterProvider, $stateProvider, $locationProvider) {

      $locationProvider.html5Mode(true);
      //$urlRouterProvider.otherwise('/login');

        $stateProvider
          .state('todos', {
            url: '/',
            resolve: {
              token: function ($state, Token) {
                return Token.isPresent().then(function (status) {
                  console.log(status)
                }).catch(function(error){
                    console.log(error);
                    $state.go('login');
                });
              }
            },
            views: {
              'header@': {
                controller: 'authController as authCtrl',
                templateUrl: 'partials/header'
             },
             'main@': {
                controller: 'todosController as todosCtrl',
                templateUrl: 'partials/todos'
            },
            'footer@': {
                templateUrl: 'partials/footer'
            }
          }
        })
        .state('login', {
          url: '/login',
          views: {
            'main@': {
              templateUrl: 'partials/auth',
              controller: 'authController as authCtrl' }
          }
        });
    });

})();
