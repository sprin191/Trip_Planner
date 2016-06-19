myApp.controller('ItineraryController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.currentItineraryDate = {};
$scope.displayedDateID = '';
$scope.newActivity = {};
$scope.deleteBtns = '';

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

//Hides delete buttons.
  $scope.hideDeleteBtns = function () {
    $scope.deleteBtns = '';
  };

//Displays add item field.
  $scope.addItem = function (id) {
    //console.log('showAddItem', id);
    $scope.displayedDateID = id;
  };

//Adds new itinerary date to database.
    $scope.submitNewDate = function () {
      //console.log($scope.currentItineraryDate);
    $http.put('/itinerary1/' + $scope.factoryCurrentTrip.data._id, $scope.currentItineraryDate)
      .then(function (response) {
        //console.log('PUT /itinerary1/ ', $scope.currentItineraryDate);
        loadUpdatedTrip();
      });
  };

//Submits new itinerary item to database.
    $scope.submitNewItem = function (id) {
      var item = $scope.newActivity;
        $http.put('/itinerary1/' + $scope.factoryCurrentTrip.data._id + '/date/' + id + '/item', item)
          .then(function (response) {
            //console.log('PUT /itinerary1/ ', item);
            loadUpdatedTrip();
          });
      };

//Deletes item from the database.
  $scope.deleteItem = function (id1, id2) {
  $http.delete('/itinerary1/' + $scope.factoryCurrentTrip.data._id + '/date/' + id1 + '/item/' + id2)
    .then(function (response) {
      //console.log('DELETE /item/ ', id2);
      loadUpdatedTrip();
      });
   };

//Deletes a date from the database.
   $scope.deleteDate = function (id) {
   $http.delete('/itinerary1/' + $scope.factoryCurrentTrip.data._id + '/date/' + id)
     .then(function (response) {
       //console.log('DELETE /date/ ', id);
       loadUpdatedTrip();
       });
    };

//Retrieves trip information.
  function loadUpdatedTrip() {
      $scope.dataFactory.factoryGetSelectedTrip($scope.factoryCurrentTrip.data._id);
      $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
    }

}]);
