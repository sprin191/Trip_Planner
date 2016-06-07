myApp.factory('DataFactory', ['$http', function($http) {
  console.log('dataFactory running');

  // PRIVATE
  var userName = undefined;

  function getUser() {
    var promise = $http.get('/user').then(function(response) {
      userName = response.data.username;
    });
    return promise;
  }

  // PUBLIC
  var publicApi = {
    factoryRefreshUser: function() {
      return getUser();
    },
    factoryCurrentUser: function() {
      return userName;
    }
  };

  return publicApi;

}]);
