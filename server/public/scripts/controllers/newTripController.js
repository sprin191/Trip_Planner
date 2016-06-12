myApp.controller('NewTripController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
    $scope.dataFactory = DataFactory;
    $scope.currentTrip = {};
    $scope.message = '';

    $scope.submitNewTrip = function () {
      var data = $scope.currentTrip;
      // data.userid =
      console.log(data);
      $http.post('/trips', data)
        .then(function () {
          console.log('POST /trips');
          location.reload();
          $scope.message = "Your new trip has been added!";
        });
    };


}]);
