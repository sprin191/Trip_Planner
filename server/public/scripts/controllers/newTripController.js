myApp.controller('NewTripController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
    $scope.dataFactory = DataFactory;
    $scope.currentTrip = {};

    $scope.submitNewTrip = function () {
      var data = $scope.currentTrip;
      // data.userid = 
      console.log(data);
      $http.post('/trips', data)
        .then(function () {
          console.log('POST /trips');
        });
    };


}]);
