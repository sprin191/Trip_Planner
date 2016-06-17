myApp.controller('UserController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.hidden = true;
$scope.message = "";
$scope.recentTrip = {};
$scope.includedTrip = "";
$scope.newUser = "";
$scope.errorMessage = "";
$scope.successMessage ="";
$scope.first_name ="";
$scope.userInfo="";

  getRecentTrip();
  loadLogin();
  getGroupMembers();

//Retrieves user information.
  function loadLogin () {
  if($scope.dataFactory.factoryCurrentUser() === undefined) {
      $scope.dataFactory.factoryRefreshUser().then(function() {
        $scope.first_name = $scope.dataFactory.factoryCurrentUser();
        if ($scope.dataFactory.factoryCurrentUser() === undefined) {
          $location.path("/home");
        }
      });
    } else {
      $scope.first_name = $scope.dataFactory.factoryCurrentUser();
    }
  }

//Retrieves most recently created trip information.
    function getRecentTrip() {
      $scope.dataFactory.factoryGetRecentTrip().then(function() {
      $scope.recentTrip = $scope.dataFactory.factoryCurrentTrip.data;
      //console.log($scope.recentTrip);
            if ($scope.recentTrip === undefined) {
              $scope.message = "You don't have any trips yet.";
            }
          });
      }

//Retrieves group member information if applicable.
      function getGroupMembers() {
        $scope.dataFactory.factoryGetRecentTrip().then(function() {
        $scope.recentTrip = $scope.dataFactory.factoryCurrentTrip.data;
        if ($scope.recentTrip !== undefined) {
        var tripID = $scope.dataFactory.factoryCurrentTrip.data._id;
        $http.get('/selectedTrip/' + tripID + '/users/')
          .then(function (response) {
            $scope.userInfo = response.data;
          });
        }
        });
      }

//Deletes a trip member.
      $scope.deleteMember = function (id) {
        var confirmation = confirm("Are you sure you want to remove this user from the trip?");
        if (confirmation === true) {
      $http.delete('/selectedTrip/' + $scope.recentTrip._id + '/' + id)
        .then(function (response) {
          //console.log('DELETE /user/ ', $scope.recentTrip._id);
          location.reload();
          });
        }
       };

//Deletes trip.
      $scope.deleteTrip = function () {
        var confirmation = confirm("Are you sure you want to delete this trip?");
        if (confirmation === true) {
      $http.delete('/selectedTrip/' + $scope.recentTrip._id)
        .then(function (response) {
          //console.log('DELETE /trip/ ', $scope.recentTrip._id);
          location.reload();
          });
        }
       };

//Displays add user field.
       $scope.addUser = function (tripName) {
         $scope.includedTrip = tripName;
         //console.log(tripName);
       };

//Adds a new group member to the trip.
       $scope.submitUser = function () {
         var email = $scope.newUser;
         //console.log($scope.newUser);
       $http.put('/selectedTrip/' + $scope.recentTrip._id + '/email', email)
         .then(function (response) {
           if(response.data.error) {
            $scope.errorMessage = response.data.error;
           }
           else {
             $scope.errorMessage = "";
             $scope.successMessage = "Success!";
             location.reload();
           }
         });
       };

}]);
