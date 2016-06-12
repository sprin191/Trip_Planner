myApp.controller('GroceriesController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.currentGroceryCategory = {};
$scope.displayedCategoryID = '';
$scope.newItem = {};
$scope.checkedItem = {};

  console.log($scope.factoryCurrentTrip.data.groceries);

  $scope.addItem = function (id) {
    console.log('showAddItem', id);
    $scope.displayedCategoryID = id;
  };

    $scope.submitNewCategory = function () {
      console.log($scope.currentGroceryCategory);
    $http.put('/grocery/' + $scope.factoryCurrentTrip.data._id, $scope.currentGroceryCategory)
      .then(function (response) {
        console.log('PUT /selectedTrip/ ', $scope.currentGroceryCategory);
        loadUpdatedTrip();
      });
  };

    $scope.submitNewItem = function (id) {
      $scope.newItem.purchased = false;
      var item = $scope.newItem;
        $http.put('/grocery/' + $scope.factoryCurrentTrip.data._id + '/category/' + id + '/item', item)
          .then(function (response) {
            console.log('PUT /grocery/ ', item);
            loadUpdatedTrip();
          });
      };

      $scope.updatePurchased = function (id1, id2) {
        var status = $scope.checkedItem;
        console.log($scope.checkedItem);
        $http.put('/grocery/' + $scope.factoryCurrentTrip.data._id + '/category/' + id1 + '/item/' + id2 + '/status', status)
          .then(function (response) {
            console.log('Put /item/ ', id2);
            loadUpdatedTrip();
            });
      };

  $scope.deleteItem = function (id1, id2) {
  $http.delete('/grocery/' + $scope.factoryCurrentTrip.data._id + '/category/' + id1 + '/item/' + id2)
    .then(function (response) {
      console.log('DELETE /item/ ', id2);
      loadUpdatedTrip();
      });
   };

  function loadUpdatedTrip() {
      $scope.dataFactory.factoryGetSelectedTrip($scope.factoryCurrentTrip.data._id);
      $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
    }

}]);
