myApp.controller('NewTripController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
    $scope.dataFactory = DataFactory;
    $scope.currentTrip = {};

//Submits new trip data to the database.
    $scope.submitNewTrip = function () {
      var data = $scope.currentTrip;
      //console.log(data);
      $http.post('/trips', data)
        .then(function () {
          //console.log('POST /trips');
          $window.location.href='#/user';
          $window.location.reload();
        });
    };


}]);
