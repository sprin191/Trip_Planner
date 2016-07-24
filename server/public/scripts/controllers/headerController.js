myApp.controller('HeaderController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.hidden = true;

  loadLogin();

//Retrieves user information.
    function loadLogin () {
      if($scope.dataFactory.factoryCurrentUser() === undefined) {
        $scope.dataFactory.factoryRefreshUser().then(function() {
          $scope.userName = $scope.dataFactory.factoryCurrentUser();
          $scope.hidden = false;
          if ($scope.dataFactory.factoryCurrentUser() === undefined) {
            $location.path("/home");
            $scope.hidden = true;
            console.log($scope.hidden);
          }
          if ($scope.dataFactory.factoryCurrentUser() !== undefined) {
            getTrips();
            $scope.hidden = false;
            console.log($scope.hidden);
          }
        });
      } else {
        $scope.userName = $scope.dataFactory.factoryCurrentUser();
        $scope.hidden = false;
        console.log($scope.hidden);
      }
    }

//Retrieves selected trip information on-click in dropdown.
  $scope.loadSelectedTrip = function(id) {
    if(id !== '') {
      $scope.dataFactory.factoryGetSelectedTrip(id).then(function() {
          $location.path ("/currentTrip");
      });
    }
  };

//On-click event function; if the user clicks on the app name in the header, it will redirect the user accordingly.
  $scope.routeHome = function() {
    if ($scope.dataFactory.factoryCurrentUser() === undefined) {
      $location.path("/home");
    }
    else {
      $location.path("/currentTrip");
    }
  };

//Logs user out.
  $scope.logout = function() {
    //console.log('made to logged out');
    $http.get('/user/logout').then(function(response) {
      //console.log('logged out');
      $scope.hidden = true;
      $location.path("/home");
      //location.reload();
    });
  };

//Retrieves user's trip data.
  function getTrips() {
      $http.get('/trips')
        .then(function (response) {
          response.data.forEach(function (trip) {
            trip.departure = new Date(trip.departure);
            trip.return = new Date(trip.return);
          });
          $scope.trips = response.data;
          //console.log('GET /trips ', response.data);
        });
    }

}]);
