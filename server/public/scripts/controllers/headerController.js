myApp.controller('HeaderController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.hidden = true;
$scope.currentTrip = '';
$scope.factoryCurrentTrip = '';

  console.log('checking user');

  loadLogin();
  getTrips();

  $scope.loadSelectedTrip = function() {
    console.log($scope.currentTrip._id);
    if($scope.currentTrip !== '') {
      $scope.dataFactory.factoryGetSelectedTrip($scope.currentTrip._id).then(function() {
        $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip();
      });
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
