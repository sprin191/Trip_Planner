var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);
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
    .when('/currentTrip', {
      templateUrl: '/views/currentTrip.html',
      controller: "CurrentTripController",
    })
    .when('/meals', {
      templateUrl: '/views/meals.html',
      controller: "MealsController",
    })
    .when('/itinerary', {
      templateUrl: '/views/itinerary.html',
      controller: "ItineraryController",
    })
    .when('/notes', {
      templateUrl: '/views/notes.html',
      controller: "NotesController",
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
