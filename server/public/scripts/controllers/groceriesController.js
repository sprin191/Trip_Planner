myApp.controller('GroceriesController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.currentGroceryCategory = {};
$scope.displayedCategoryID = '';
$scope.newItem = {};
$scope.deleteBtns = '';

//console.log($scope.dataFactory.factoryCurrentTrip);

//Retrieves selected trip data.
if($scope.dataFactory.factoryCurrentTrip.data === undefined) {
  //console.log($scope.dataFactory.factoryCurrentLocalStorage());
  $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentLocalStorage();
  //console.log($scope.factoryCurrentTrip.data);
}

//Displays delete buttons.
$scope.showDeleteBtns = function () {
  $scope.deleteBtns = $scope.factoryCurrentTrip.data._id;
};

//Hides delete buttons.
  $scope.hideDeleteBtns = function () {
    $scope.deleteBtns = '';
  };

//Displays add item field.
  $scope.addItem = function (id) {
    //console.log('showAddItem', id);
    $scope.displayedCategoryID = id;
  };

//Submits new category, and retrieves updated information.
  $scope.submitNewCategory = function () {
    console.log($scope.currentGroceryCategory);
    $http.put('/grocery/' + $scope.factoryCurrentTrip.data._id, $scope.currentGroceryCategory)
      .then(function (response) {
        //console.log('PUT /selectedTrip/ ', $scope.currentGroceryCategory);
        loadUpdatedTrip();
      });
  };

//Submits new item, and retrieves updated information.
    $scope.submitNewItem = function (id) {
      $scope.newItem.purchased = false;
      var item = $scope.newItem;
        $http.put('/grocery/' + $scope.factoryCurrentTrip.data._id + '/category/' + id + '/item', item)
          .then(function (response) {
            //console.log('PUT /grocery/ ', item);
            loadUpdatedTrip();
          });
      };

//Updates statuses of checked/unchecked items in the database.
  $scope.updatePurchased = function (groceryData) {
    $http.put('/grocery/' + $scope.factoryCurrentTrip.data._id + '/update', groceryData)
      .then(function (response) {
        //console.log('Put /item/ ', groceryData);
        $scope.successMessage = "Updates saved.";
        loadUpdatedTrip();
        });
      };

//Deletes items from the database.
  $scope.deleteItem = function (id1, id2) {
  $http.delete('/grocery/' + $scope.factoryCurrentTrip.data._id + '/category/' + id1 + '/item/' + id2)
    .then(function (response) {
      //console.log('DELETE /item/ ', id2);
      loadUpdatedTrip();
      });
   };

//Deletes categories from the database.
   $scope.deleteCategory = function (id) {
   $http.delete('/grocery/' + $scope.factoryCurrentTrip.data._id + '/category/' + id)
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
