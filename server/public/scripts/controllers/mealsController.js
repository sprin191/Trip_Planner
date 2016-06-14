myApp.controller('MealsController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.currentMealDate = {};
$scope.newItem = {};
$scope.checkedItem = {};

console.log($scope.dataFactory.factoryCurrentTrip);

if($scope.dataFactory.factoryCurrentTrip.data === undefined) {
  console.log($scope.dataFactory.factoryCurrentLocalStorage());
  $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentLocalStorage();
  console.log($scope.factoryCurrentTrip.data);
}

    $scope.submitNewDate = function () {
      console.log($scope.currentMealDate);
    $http.put('/meal/' + $scope.factoryCurrentTrip.data._id, $scope.currentMealDate)
      .then(function (response) {
        console.log('PUT /meal/ ', $scope.currentMealDate);
        loadUpdatedTrip();
      });
  };

  $scope.deleteDate = function (id) {
  $http.delete('/meal/' + $scope.factoryCurrentTrip.data._id + '/date/' + id)
    .then(function (response) {
      console.log('DELETE /meal/ ', id);
      loadUpdatedTrip();
      });
   };

  function loadUpdatedTrip() {
      $scope.dataFactory.factoryGetSelectedTrip($scope.factoryCurrentTrip.data._id);
      $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
    }

}]);
