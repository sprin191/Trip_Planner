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
      var promise = $http.get('/selectedTrip/' + id).then(function (trip) {
            trip.departure = new Date(trip.departure);
            trip.return = new Date(trip.return);
            selectedTrip = trip.data;
            console.log('GET /selectedTrip ', trip.data);
          });
          return promise;
    },
    factoryCurrentTrip: function() {
      console.log(selectedTrip);
      return selectedTrip;
    },
    factoryGetRecentTrip: function () {
        var promise = $http.get('/trips').then(function (response) {
            console.log(response.data);
            response.data.forEach(function (trip) {
              trip.departure = new Date(trip.departure);
              trip.return = new Date(trip.return);
            });
            if (response.data.length === 0) {
              console.log("You don't have any trips yet.");
            }
            else {
              selectedTrip = response.data[response.data.length - 1];
              selectedTrip.departure = moment(selectedTrip.departure).format('MM/DD/YYYY');
              selectedTrip.return = moment(selectedTrip.return).format('MM/DD/YYYY');
              console.log('GET /trips ', selectedTrip);
            }
          });
          return promise;
      }
  };

  return publicApi;

}]);
