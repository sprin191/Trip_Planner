myApp.factory('DataFactory', ['$http', function($http) {
  console.log('dataFactory running');

  // PRIVATE
  var userName = undefined;
  var selectedTrip = {};

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
            trip.data[0].departure = moment( new Date(trip.data[0].departure)).format('MM/DD/YYYY');
            trip.data[0].return = moment( new Date(trip.data[0].return)).format('MM/DD/YYYY');
            selectedTrip.data = trip.data[0];
            console.log('GET /selectedTrip ', selectedTrip);
          });
          return promise;
    },
    factoryCurrentTrip: selectedTrip,
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
              selectedTrip.data = response.data[response.data.length - 1];
              selectedTrip.data.departure = moment(selectedTrip.data.departure).format('MM/DD/YYYY');
              selectedTrip.data.return = moment(selectedTrip.data.return).format('MM/DD/YYYY');
              console.log(selectedTrip.data);
            }
          });
          return promise;
      }
  };

  return publicApi;

}]);
