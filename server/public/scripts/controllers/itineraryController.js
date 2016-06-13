myApp.controller('ItineraryController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.currentItineraryDate = {};
$scope.displayedDateID = '';
$scope.newActivity = {};

  console.log($scope.factoryCurrentTrip.data.itinerary);

  $scope.addItem = function (id) {
    console.log('showAddItem', id);
    $scope.displayedDateID = id;
  };

    $scope.submitNewDate = function () {
      console.log($scope.currentItineraryDate);
    $http.put('/itinerary1/' + $scope.factoryCurrentTrip.data._id, $scope.currentItineraryDate)
      .then(function (response) {
        console.log('PUT /itinerary1/ ', $scope.currentItineraryDate);
        loadUpdatedTrip();
      });
  };

    $scope.submitNewItem = function (id) {
      var item = $scope.newActivity;
        $http.put('/itinerary1/' + $scope.factoryCurrentTrip.data._id + '/date/' + id + '/item', item)
          .then(function (response) {
            console.log('PUT /itinerary1/ ', item);
            loadUpdatedTrip();
          });
      };

  $scope.deleteItem = function (id1, id2) {
  $http.delete('/itinerary1/' + $scope.factoryCurrentTrip.data._id + '/date/' + id1 + '/item/' + id2)
    .then(function (response) {
      console.log('DELETE /item/ ', id2);
      loadUpdatedTrip();
      });
   };

   $scope.deleteDate = function (id) {
   $http.delete('/itinerary1/' + $scope.factoryCurrentTrip.data._id + '/date/' + id)
     .then(function (response) {
       console.log('DELETE /date/ ', id);
       loadUpdatedTrip();
       });
    };

  function loadUpdatedTrip() {
      $scope.dataFactory.factoryGetSelectedTrip($scope.factoryCurrentTrip.data._id);
      $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
    }

}]);
