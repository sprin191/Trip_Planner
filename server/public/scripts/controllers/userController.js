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

  getRecentTrip();
  loadLogin();
  getGroupMembers();

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

    function getRecentTrip() {
      $scope.dataFactory.factoryGetRecentTrip().then(function() {
      $scope.recentTrip = $scope.dataFactory.factoryCurrentTrip.data;
      console.log($scope.recentTrip);
            if ($scope.recentTrip === undefined) {
              $scope.message = "You don't have any trips yet.";
            }
          });
      }

      function getGroupMembers() {
        $scope.dataFactory.factoryGetRecentTrip().then(function() {
        $scope.recentTrip = $scope.dataFactory.factoryCurrentTrip.data;
        var tripID = $scope.dataFactory.factoryCurrentTrip.data._id;
        $http.get('/selectedTrip/' + tripID + '/users/')
          .then(function (response) {
            console.log(response);
          });
        });
      }

      $scope.deleteTrip = function () {
        var confirmation = confirm("Are you sure you want to delete this trip?");
        if (confirmation === true) {
      $http.delete('/selectedTrip/' + $scope.recentTrip._id)
        .then(function (response) {
          console.log('DELETE /trip/ ', $scope.recentTrip._id);
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
       $http.put('/selectedTrip/' + $scope.recentTrip._id + '/email', email)
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
