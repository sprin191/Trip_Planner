myApp.factory('DataFactory', ['$http', function($http) {
  console.log('dataFactory running');

  // PRIVATE
  var userData = undefined;

  function getUserData() {
    var promise = $http.get('/user').then(function(response) {
      userData = response.data;
    });
    return promise;
  }

  // PUBLIC
  var publicApi = {
    factoryRefreshUser: function() {
      return getUserData();
    },
    factoryCurrentUser: function() {
      return userData;
    }
  };

  return publicApi;

}]);
