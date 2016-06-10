myApp.controller('UserController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.hidden = true;
$scope.message = "";
$scope.recentTrip = {};

  getRecentTrip();
  loadLogin();

  function loadLogin () {
  if($scope.dataFactory.factoryCurrentUser() === undefined) {
      $scope.dataFactory.factoryRefreshUser().then(function() {
        $scope.userName = $scope.dataFactory.factoryCurrentUser();
        if ($scope.dataFactory.factoryCurrentUser() === undefined) {
          $location.path("/home");
        }
      });
    } else {
      $scope.userName = $scope.dataFactory.factoryCurrentUser();
    }
  }

    function getRecentTrip() {
      $scope.dataFactory.factoryGetRecentTrip().then(function() {
      $scope.recentTrip = $scope.dataFactory.factoryCurrentTrip.data;
      console.log($scope.recentTrip);
            if ($scope.recentTrip === undefined) {
              $scope.message = "You don't have any trips yet.";
            }
          });
      }

}]);
