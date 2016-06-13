myApp.controller('CurrentTripController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
$scope.recentTrip = {};
$scope.includedTrip = "";
$scope.newUser = "";
$scope.errorMessage = "";
$scope.successMessage ="";

$scope.deleteTrip = function () {
  var confirmation = confirm("Are you sure you want to delete this trip?");
  if (confirmation === true) {
$http.delete('/selectedTrip/' + $scope.factoryCurrentTrip.data._id)
  .then(function (response) {
    console.log('DELETE /trip/ ', $scope.factoryCurrentTrip.data._id);
    location.reload();
    $location.path ("/user");
    });
  }
 };

 $scope.addUser = function (tripName) {
   $scope.includedTrip = tripName;
   console.log(tripName);
 };

 $scope.submitUser = function () {
   var email = $scope.newUser;
   console.log($scope.newUser);
 $http.put('/selectedTrip/' + $scope.dataFactory.factoryCurrentTrip.data._id + '/email', email)
   .then(function (response) {
     if(response.data.error) {
      $scope.errorMessage = response.data.error;
     }
     else {
       $scope.errorMessage = "";
       $scope.successMessage = "Success!";
     }
   });
  };

}]);
