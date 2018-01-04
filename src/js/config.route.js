var angular = require('angular');

angular.module('myApp')
    .config(routeConfig);

function routeConfig($urlRouterProvider, $stateProvider) {
    $stateProvider
        .state('terms', {
            url: '/terms',
            templateUrl: 'terms.html',
            controller: 'TermsController',
            controllerAs: 'vm'
        })
        .state('users', {
            url: '/users',
            templateUrl: 'users.html',
            controller: 'UsersController',
            controllerAs: 'vm'
        });
    $urlRouterProvider.otherwise('/terms');    
}