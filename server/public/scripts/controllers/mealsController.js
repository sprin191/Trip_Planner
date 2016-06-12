myApp.controller('MealsController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
    $scope.dataFactory = DataFactory;
    $scope.factoryCurrentTrip = $scope.dataFactory.factoryCurrentTrip;

}]);
