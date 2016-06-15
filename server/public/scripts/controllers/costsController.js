myApp.controller('CostsController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.currentCostCategory = {};
$scope.displayedCategoryID = '';
$scope.newExpense = {};
$scope.categoryTotal = [];
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

  $scope.addItem = function (id) {
    console.log('showAddItem', id);
    $scope.displayedCategoryID = id;
  };

    $scope.submitNewCategory = function () {
      console.log($scope.currentCostCategory);
    $http.put('/cost/' + $scope.factoryCurrentTrip.data._id, $scope.currentCostCategory)
      .then(function (response) {
        console.log('PUT /selectedTrip/ ', $scope.currentCostCategory);
        loadUpdatedTrip();
      });
  };

    $scope.submitNewItem = function (id) {
      var item = $scope.newExpense;
        $http.put('/cost/' + $scope.factoryCurrentTrip.data._id + '/category/' + id + '/item', item)
          .then(function (response) {
            console.log('PUT /selectedTrip/ ', item);
            loadUpdatedTrip();
          });
      };

  $scope.deleteItem = function (id1, id2) {
  $http.delete('/cost/' + $scope.factoryCurrentTrip.data._id + '/category/' + id1 + '/item/' + id2)
    .then(function (response) {
      console.log('DELETE /item/ ', id2);
      loadUpdatedTrip();
      });
   };

   $scope.deleteCategory = function (id) {
   $http.delete('/cost/' + $scope.factoryCurrentTrip.data._id + '/category/' + id)
     .then(function (response) {
       console.log('DELETE /item/ ', id);
       loadUpdatedTrip();
       });
    };

   $scope.getTotal = function() {
    var total = 0;
    for(var i = 0; i < $scope.factoryCurrentTrip.data.costs.length; i++){
        var category = $scope.factoryCurrentTrip.data.costs[i];
        for(var j = 0; j < category.items.length; j++) {
        var item = category.items[j].cost;
        total += (item);
        }
    }
    return total;
};

    $scope.getGroupTotal = function() {
      var total = 0;
      var groupTotal = 0;
      for (var i = 0; i < $scope.factoryCurrentTrip.data.costs.length; i++){
          var category = $scope.factoryCurrentTrip.data.costs[i];
          for(var j = 0; j < category.items.length; j++) {
          var item = category.items[j].cost;
          total += (item);
          }
      }
      groupTotal = total / $scope.factoryCurrentTrip.data.users.length;
      return groupTotal.toFixed(2);
    };

/*$scope.getCategoryTotal = function() {
  var total = 0;
 for(var i = 0; i < $scope.factoryCurrentTrip.data.costs.length; i++){
     var category = $scope.factoryCurrentTrip.data.costs[i];
     total[i] = 0;
     for(var j = 0; j < category.items.length; j++) {
     var item = category.items[j].cost;
     console.log(item);
     total[i] += (item);
     $scope.categoryTotal.push(total[i]);
     }
 }
 console.log($scope.categoryTotal);
 return $scope.categoryTotal;
};*/

  function loadUpdatedTrip() {
      $scope.dataFactory.factoryGetSelectedTrip($scope.factoryCurrentTrip.data._id);
      $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
    }

}]);
