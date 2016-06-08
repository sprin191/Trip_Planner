myApp.factory('DataFactory', ['$http', function($http) {
  console.log('dataFactory running');

  // PRIVATE
  var userName = undefined;
  var selectedTrip = undefined;

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
    },
    factoryGetSelectedTrip: function (id) {
      var promise = $http.get('/selectedTrip' + id).then(function (trip) {
            trip.departure = new Date(trip.departure);
            trip.return = new Date(trip.return);
            selectedTrip = trip.data;
            console.log('GET /selectedTrip ', trip.data);
          });
          return promise;
    },
    factoryCurrentTrip: function() {
      return selectedTrip;
    }
  };

  return publicApi;

}]);
