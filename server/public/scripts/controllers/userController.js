myApp.controller('UserController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.hidden = true;
$scope.message = "";
$scope.recentTrip = "";
  // This happens after view/controller loads -- not ideal
  console.log('checking user');

  getRecentTrip();

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

    function getRecentTrip() {
        $http.get('/trips')
          .then(function (response) {
            response.data.forEach(function (trip) {
              trip.departure = new Date(trip.departure);
              trip.return = new Date(trip.return);
            });
            console.log('GET /trips ', response.data);
            if (response.data.length === 0) {
              $scope.message = "You don't have any trips yet.";
            }
            else {
              $scope.recentTrip = response.data[response.data.length - 1];
              console.log($scope.recentTrip);
              $scope.recentTrip.departure = moment($scope.recentTrip.departure).format('MM/DD/YYYY');
              $scope.recentTrip.return = moment($scope.recentTrip.return).format('MM/DD/YYYY');
            }
          });
      }
}]);
