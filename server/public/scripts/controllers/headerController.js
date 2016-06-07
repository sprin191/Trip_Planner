myApp.controller('HeaderController', ['$scope', '$http', '$window', '$location', 'DataFactory', function($scope, $http, $window, $location, DataFactory) {
$scope.dataFactory = DataFactory;
$scope.hidden = true;
  console.log('checking user');
  loadLogin();

  function loadLogin () {
    if($scope.dataFactory.factoryCurrentUser() === undefined) {
      $scope.dataFactory.factoryRefreshUser().then(function() {
        $scope.userName = $scope.dataFactory.factoryCurrentUser();
        $scope.hidden = false;
        if ($scope.dataFactory.factoryCurrentUser() === undefined) {
          $location.path("/home");
          $scope.hidden = true;
        }
      });
    } else {
      $scope.userName = $scope.dataFactory.factoryCurrentUser();
      $scope.hidden = false;
    }
  }

  /*$http.get('/user').then(function(response) {
      if(response.data.username) {
          $scope.userName = response.data.username;
          $scope.show = true;
          console.log('User Data: ', $scope.userName);
      } else {
          $location.path("/home");
      }
  });*/

  $scope.logout = function() {
    console.log('made to logged out');
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
      location.reload();
    });
  };

}]);
