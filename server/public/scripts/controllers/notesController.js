myApp.controller('NotesController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.currentNote = {};
$scope.newItem = {};
$scope.checkedItem = {};
$scope.deleteBtns = '';
$scope.addNote = '';

//console.log($scope.dataFactory.factoryCurrentTrip);

//Retrieves trip data.
if($scope.dataFactory.factoryCurrentTrip.data === undefined) {
  //console.log($scope.dataFactory.factoryCurrentLocalStorage());
  $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentLocalStorage();
  //console.log($scope.factoryCurrentTrip.data);
}

//Submits new note to the database.
 $scope.submitNewNote = function () {
   //console.log($scope.currentNote);
    $http.put('/note/' + $scope.factoryCurrentTrip.data._id, $scope.currentNote)
      .then(function (response) {
        //console.log('PUT /note/ ', $scope.currentNote);
        loadUpdatedTrip();
      });
  };

//Displays add new note field.
  $scope.addItem = function () {
    //console.log($scope.factoryCurrentTrip.data.notes.length);
    $scope.addNote = $scope.factoryCurrentTrip.data.notes.length;
  };

//Displays delete buttons.
  $scope.showDeleteBtns = function () {
    $scope.deleteBtns = $scope.factoryCurrentTrip.data._id;
  };

//Deletes a note from the database.
  $scope.deleteNote = function (id) {
  $http.delete('/note/' + $scope.factoryCurrentTrip.data._id + '/title/' + id)
    .then(function (response) {
      //console.log('DELETE /note/ ', id);
      loadUpdatedTrip();
      });
   };

//Retrieves trip information.
  function loadUpdatedTrip() {
      $scope.dataFactory.factoryGetSelectedTrip($scope.factoryCurrentTrip.data._id);
      $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
    }

}]);
