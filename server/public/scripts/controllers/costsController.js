myApp.controller('CostsController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.currentCostCategory = {};
$scope.displayedCategoryID = '';
$scope.newExpense = {};

  console.log($scope.factoryCurrentTrip.data.costs);

  $scope.addItem = function (id) {
    console.log('showAddItem', id);
    $scope.displayedCategoryID = id;
  };

    $scope.submitNewCategory = function () {
      console.log($scope.currentCostCategory);
    $http.put('/selectedTrip/' + $scope.factoryCurrentTrip.data._id, $scope.currentCostCategory)
      .then(function (response) {
        console.log('PUT /selectedTrip/ ', $scope.currentCostCategory);
        loadUpdatedTrip();
      });
  };

    $scope.submitNewItem = function (id) {
      var item = $scope.newExpense;
        $http.put('/selectedTrip/' + $scope.factoryCurrentTrip.data._id + '/category/' + id + '/items', item)
          .then(function (response) {
            console.log('PUT /selectedTrip ', item);
            loadUpdatedTrip();
          });
      };

  $scope.deleteItem = function (id1, id2) {
  $http.delete('/selectedTrip/' + $scope.factoryCurrentTrip.data._id + '/category/' + id1 + '/item/' + id2)
    .then(function (response) {
      console.log('DELETE /item ', id2);
      loadUpdatedTrip();
      });
   };

   $scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < $scope.factoryCurrentTrip.data.costs.length; i++){
        var category = $scope.factoryCurrentTrip.data.costs[i];
        for(var j = 0; j < category.items.length; j++) {
        var item = category.items[j].cost;
        console.log(item);
        total += (item);
        }
    }
    console.log(total);
    return total;
};

  function loadUpdatedTrip() {
      $scope.dataFactory.factoryGetSelectedTrip($scope.factoryCurrentTrip.data._id);
      $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
    }

}]);
