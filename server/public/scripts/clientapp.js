var myApp = angular.module('myApp', ['ngRoute']);
/// Routes ///

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController"
    })
    .when('/user', {
      templateUrl: '/views/user.html',
      controller: "UserController"
    })
    .when('/newTrip', {
      templateUrl: '/views/newTrip.html',
      controller: "NewTripController",
    })
    .when('/costs', {
      templateUrl: '/views/costs.html',
      controller: "CostsController",
    })
    .when('/groceries', {
      templateUrl: '/views/groceries.html',
      controller: "GroceriesController",
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
