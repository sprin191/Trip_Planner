myApp.controller('CostsController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.currentCostCategory = {};

  console.log($scope.factoryCurrentTrip.data.costs);


    $scope.submitNewCategory = function () {
      console.log($scope.currentCostCategory);
    $http.put('/selectedTrip/' + $scope.factoryCurrentTrip.data._id, $scope.currentCostCategory)
      .then(function (response) {
        console.log('PUT /selectedTrip/ ', $scope.currentCostCategory);
        loadUpdatedTrip();
      });
  };

    $scope.addNewItem = function (category) {
      var categoryID = category._id;
        $http.put('/selectedTrip/' + categoryID, category)
          .then(function (response) {
            console.log('PUT /selectedTrip ', category);
            loadUpdatedTrip();
          });
      };

  function loadUpdatedTrip() {
      $scope.dataFactory.factoryGetSelectedTrip($scope.factoryCurrentTrip.data._id);
      $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
    }

}]);
