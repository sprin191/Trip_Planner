myApp.factory('DataFactory', ['$http', function($http) {
  console.log('dataFactory running');

  // PRIVATE
  var first_name = undefined;
  var selectedTrip = {};

  function getUser() {
    var promise = $http.get('/user').then(function(response) {
      first_name = response.data.first_name;
    });
    return promise;
  }

  function getLocalStorage() {
    var currentTrip = localStorage.getItem("trip");
    return JSON.parse(currentTrip);
  }


  // PUBLIC
  var publicApi = {
    factoryRefreshUser: function() {
      return getUser();
    },
    factoryCurrentUser: function() {
      return first_name;
    },
    factoryGetSelectedTrip: function (id) {
      var promise = $http.get('/selectedTrip/' + id).then(function (trip) {
            trip.data[0].departure = moment( new Date(trip.data[0].departure)).format('MM/DD/YYYY');
            trip.data[0].return = moment( new Date(trip.data[0].return)).format('MM/DD/YYYY');
            for (var i = 0; i < trip.data[0].meals.length; i++) {
            trip.data[0].meals[i].date = moment( new Date(trip.data[0].meals[i].date)).format('MM/DD/YYYY');
            }
            for (var j = 0; j < trip.data[0].itinerary.length; j++) {
            trip.data[0].itinerary[j].date = moment( new Date(trip.data[0].itinerary[j].date)).format('MM/DD/YYYY');
            }
            selectedTrip.data = trip.data[0];
            localStorage.setItem("trip", JSON.stringify(selectedTrip));
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
              for (var i = 0; i < trip.meals.length; i++) {
              trip.meals[i].date = moment( new Date(trip.meals[i].date)).format('MM/DD/YYYY');
              }
              for (var j = 0; j < trip.itinerary.length; j++) {
              trip.itinerary[j].date = moment( new Date(trip.itinerary[j].date)).format('MM/DD/YYYY');
              }
            });
            if (response.data.length === 0) {
              console.log("You don't have any trips yet.");
            }
            else {
              selectedTrip.data = response.data[response.data.length - 1];
              selectedTrip.data.departure = moment(selectedTrip.data.departure).format('MM/DD/YYYY');
              selectedTrip.data.return = moment(selectedTrip.data.return).format('MM/DD/YYYY');
              console.log(selectedTrip.data);
              localStorage.setItem("trip", JSON.stringify(selectedTrip));
            }
          });
          return promise;
      },
      factoryCurrentLocalStorage: function() {
        return getLocalStorage();
      }
  };

  return publicApi;

}]);
