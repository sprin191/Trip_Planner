myApp.controller('PackController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.currentPackCategory = {};
$scope.displayedCategoryID = '';
$scope.newItem = {};
$scope.deleteBtns = '';

console.log($scope.dataFactory.factoryCurrentTrip);

if($scope.dataFactory.factoryCurrentTrip.data === undefined) {
  console.log($scope.dataFactory.factoryCurrentLocalStorage());
  $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentLocalStorage();
  console.log($scope.factoryCurrentTrip.data);
}

$scope.showDeleteBtns = function () {
  $scope.deleteBtns = $scope.factoryCurrentTrip.data._id;
};

$scope.seeUpdate = function () {
  console.log($scope.factoryCurrentTrip.data.pack);
};

  $scope.addItem = function (id) {
    console.log('showAddItem', id);
    $scope.displayedCategoryID = id;
  };

    $scope.submitNewCategory = function () {
      console.log($scope.currentPackCategory);
    $http.put('/packing/' + $scope.factoryCurrentTrip.data._id, $scope.currentPackCategory)
      .then(function (response) {
        console.log('PUT /packing/ ', $scope.currentPackCategory);
        loadUpdatedTrip();
      });
  };

    $scope.submitNewItem = function (id) {
      $scope.newItem.packed = false;
      var item = $scope.newItem;
        $http.put('/packing/' + $scope.factoryCurrentTrip.data._id + '/category/' + id + '/item', item)
          .then(function (response) {
            console.log('PUT /packing/ ', item);
            loadUpdatedTrip();
          });
      };



  $scope.updatePacked = function (packingData) {
    $http.put('/packing/' + $scope.factoryCurrentTrip.data._id + '/update', packingData)
      .then(function (response) {
        console.log('Put /item/ ', packingData);
        $scope.successMessage = "Updates saved.";
        loadUpdatedTrip();
        });
      };

  $scope.deleteItem = function (id1, id2) {
  $http.delete('/packing/' + $scope.factoryCurrentTrip.data._id + '/category/' + id1 + '/item/' + id2)
    .then(function (response) {
      console.log('DELETE /item/ ', id2);
      loadUpdatedTrip();
      });
   };

   $scope.deleteCategory = function (id) {
   $http.delete('/packing/' + $scope.factoryCurrentTrip.data._id + '/category/' + id)
     .then(function (response) {
       console.log('DELETE /item/ ', id);
       loadUpdatedTrip();
       });
    };

  function loadUpdatedTrip() {
      $scope.dataFactory.factoryGetSelectedTrip($scope.factoryCurrentTrip.data._id);
      $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
    }

}]);
