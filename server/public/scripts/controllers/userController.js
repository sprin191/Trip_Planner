myApp.controller('UserController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.movies = [];
$scope.dataFactory = DataFactory;
$scope.hidden = true;
$scope.message = "";
  // This happens after view/controller loads -- not ideal
  console.log('checking user');

  getTrips();

  if($scope.dataFactory.factoryCurrentUser() === undefined) {
      $scope.dataFactory.factoryRefreshUser().then(function() {
        $scope.userName = $scope.dataFactory.factoryCurrentUser();
        console.log('User Data: ', $scope.dataFactory.factoryCurrentUser());
        $scope.hidden = false;
        if ($scope.dataFactory.factoryCurrentUser() === undefined) {
          $location.path("/home");
        }
      });
    } else {
      $scope.userName = $scope.dataFactory.factoryCurrentUser();
      console.log('User Data: ', $scope.dataFactory.factoryCurrentUser());
      $scope.hidden = false;
    }

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
