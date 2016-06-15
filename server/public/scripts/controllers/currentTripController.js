myApp.controller('CurrentTripController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.factoryCurrentTrip = {};
$scope.includedTrip = "";
$scope.newUser = "";
$scope.errorMessage = "";
$scope.successMessage ="";
$scope.tripName="";
$scope.userInfo="";

console.log($scope.dataFactory.factoryCurrentTrip);

if($scope.dataFactory.factoryCurrentTrip.data === undefined) {
  console.log($scope.dataFactory.factoryCurrentLocalStorage());
  $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentLocalStorage();
  console.log($scope.factoryCurrentTrip.data);
  $scope.dataFactory.factoryGetSelectedTrip($scope.factoryCurrentTrip.data._id).then(function() {
  $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
  var tripID = $scope.factoryCurrentTrip.data._id;
  $http.get('/selectedTrip/' + tripID + '/users/')
    .then(function (response) {
      $scope.userInfo = response.data;
    });
  });
}
else {
  getGroupMembers();
}

function getGroupMembers() {
  $scope.dataFactory.factoryGetSelectedTrip($scope.dataFactory.factoryCurrentTrip.data._id).then(function() {
  $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;
  var tripID = $scope.dataFactory.factoryCurrentTrip.data._id;
  $http.get('/selectedTrip/' + tripID + '/users/')
    .then(function (response) {
      $scope.userInfo = response.data;
    });
  });
}

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

 $scope.deleteMember = function (id) {
   var confirmation = confirm("Are you sure you want to remove this user from the trip?");
   if (confirmation === true) {
 $http.delete('/selectedTrip/' + $scope.factoryCurrentTrip.data._id + '/' + id)
   .then(function (response) {
     console.log('DELETE /user/ ', $scope.factoryCurrentTrip.data._id);
     location.reload();
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
   console.log($scope.factoryCurrentTrip.data.users);
 $http.put('/selectedTrip/' + $scope.factoryCurrentTrip.data._id + '/email', email)
   .then(function (response) {
     if(response.data.error) {
      $scope.errorMessage = response.data.error;
     }
     else {
       $scope.errorMessage = "";
       $scope.successMessage = "Success!";
       console.log($scope.dataFactory.factoryCurrentTrip.data.users);
       location.reload();
     }
   });
  };

}]);
