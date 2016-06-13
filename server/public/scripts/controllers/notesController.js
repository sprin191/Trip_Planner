myApp.controller('NotesController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.currentNote = {};
$scope.newItem = {};
$scope.checkedItem = {};

  console.log($scope.factoryCurrentTrip.data.notes);

    $scope.submitNewNote = function () {
      console.log($scope.currentNote);
    $http.put('/note/' + $scope.factoryCurrentTrip.data._id, $scope.currentNote)
      .then(function (response) {
        console.log('PUT /note/ ', $scope.currentNote);
        loadUpdatedTrip();
      });
  };

  $scope.deleteNote = function (id) {
  $http.delete('/note/' + $scope.factoryCurrentTrip.data._id + '/title/' + id)
    .then(function (response) {
      console.log('DELETE /note/ ', id);
      loadUpdatedTrip();
      });
   };

  function loadUpdatedTrip() {
      $scope.dataFactory.factoryGetSelectedTrip($scope.factoryCurrentTrip.data._id);
      $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
    }

}]);
