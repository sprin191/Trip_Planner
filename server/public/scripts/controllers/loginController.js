myApp.controller('LoginController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    $scope.user = {
      username: '',
      password: ''
    };
    $scope.message = '';
    $scope.successMessage = '';

    $scope.login = function() {
      if($scope.user.username === '' || $scope.user.password === '') {
        $scope.message = "Please enter your username and password.";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/user');
            location.reload();
          } else {
            console.log('failure: ', response);
            $scope.message = "Incorrect login credentials, please try again.";
          }
        });
      }
    };

    $scope.registerUser = function() {
      if($scope.user.username === '' || $scope.user.password === '') {
        $scope.message = "Choose a username and password.";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/register', $scope.user).then(function(response) {
          console.log('success');
          $scope.message = "";
          $location.path('/home');
        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again; username may already be taken.";
        });
      }
    };
}]);
