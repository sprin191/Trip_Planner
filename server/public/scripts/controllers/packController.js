myApp.controller('PackController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.currentPackCategory = {};
$scope.displayedCategoryID = '';
$scope.newItem = {};
$scope.deleteBtns = '';
$scope.successMessage = '';

//console.log($scope.dataFactory.factoryCurrentTrip);

//Retrieves trip data.
if($scope.dataFactory.factoryCurrentTrip.data === undefined) {
  //console.log($scope.dataFactory.factoryCurrentLocalStorage());
  $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentLocalStorage();
  //console.log($scope.factoryCurrentTrip.data);
}

//Displays delete buttons.
$scope.showDeleteBtns = function () {
  $scope.deleteBtns = $scope.factoryCurrentTrip.data._id;
};

//Displays add item field.
  $scope.addItem = function (id) {
    //console.log('showAddItem', id);
    $scope.displayedCategoryID = id;
  };

//Hides delete buttons.
    $scope.hideDeleteBtns = function () {
      $scope.deleteBtns = '';
    };

//Submits a new packing category to the database.
  $scope.submitNewCategory = function () {
    //console.log($scope.currentPackCategory);
    $http.put('/packing/' + $scope.factoryCurrentTrip.data._id, $scope.currentPackCategory)
      .then(function (response) {
        $scope.currentPackCategory.category = '';
        //console.log('PUT /packing/ ', $scope.currentPackCategory);
        loadUpdatedTrip();
      });
  };

//Submits a new packing item to the database.
    $scope.submitNewItem = function (id) {
      $scope.newItem.packed = false;
      var item = $scope.newItem;
        $http.put('/packing/' + $scope.factoryCurrentTrip.data._id + '/category/' + id + '/item', item)
          .then(function (response) {
            $scope.newItem.name = '';
            //console.log('PUT /packing/ ', item);
            loadUpdatedTrip();
          });
      };

//Updates statuses of checked/unchecked items in the database.
  $scope.updatePacked = function (packingData) {
    $http.put('/packing/' + $scope.factoryCurrentTrip.data._id + '/update', packingData)
      .then(function (response) {
        //console.log('Put /item/ ', packingData);
        $scope.successMessage = "Updates saved.";
        loadUpdatedTrip();
        });
      };

//Deletes an item from the database.
  $scope.deleteItem = function (id1, id2) {
  $http.delete('/packing/' + $scope.factoryCurrentTrip.data._id + '/category/' + id1 + '/item/' + id2)
    .then(function (response) {
      //console.log('DELETE /item/ ', id2);
      loadUpdatedTrip();
      });
   };

//Deletes a category from the database.
   $scope.deleteCategory = function (id) {
   $http.delete('/packing/' + $scope.factoryCurrentTrip.data._id + '/category/' + id)
     .then(function (response) {
       //console.log('DELETE /item/ ', id);
       loadUpdatedTrip();
       });
    };

//Retrieves trip information.
  function loadUpdatedTrip() {
      $scope.dataFactory.factoryGetSelectedTrip($scope.factoryCurrentTrip.data._id);
      $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
    }

}]);
