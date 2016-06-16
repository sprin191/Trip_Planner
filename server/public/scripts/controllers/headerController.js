myApp.controller('HeaderController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.hidden = true;

  loadLogin();

  $scope.loadSelectedTrip = function(id) {
    if(id !== '') {
      $scope.dataFactory.factoryGetSelectedTrip(id).then(function() {
          $location.path ("/currentTrip");
      });
    }
  };

  $scope.routeHome = function() {
    if ($scope.dataFactory.factoryCurrentUser() === undefined) {
      $location.path("/home");
    }
    else {
      $location.path("/currentTrip");
    }
  };

  function loadLogin () {
    if($scope.dataFactory.factoryCurrentUser() === undefined) {
      $scope.dataFactory.factoryRefreshUser().then(function() {
        $scope.userName = $scope.dataFactory.factoryCurrentUser();
        $scope.hidden = false;
        if ($scope.dataFactory.factoryCurrentUser() === undefined) {
          $location.path("/home");
          $scope.hidden = true;
        }
        if ($scope.dataFactory.factoryCurrentUser() !== undefined) {
          getTrips();
        }
      });
    } else {
      $scope.userName = $scope.dataFactory.factoryCurrentUser();
      $scope.hidden = false;
    }
  }

  $scope.logout = function() {
    console.log('made to logged out');
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
      location.reload();
    });
  };

  function getTrips() {
      $http.get('/trips')
        .then(function (response) {
          response.data.forEach(function (trip) {
            trip.departure = new Date(trip.departure);
            trip.return = new Date(trip.return);
          });
          $scope.trips = response.data;
          console.log('GET /trips ', response.data);
        });
    }

}]);
