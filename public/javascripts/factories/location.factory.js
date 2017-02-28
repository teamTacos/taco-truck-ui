angular.module('tacoTruck')

  .factory('Locations', function ($http, tacoTruckApiUrl) {

    return {

      getAll: function () {
        return $http({
          method: 'GET',
          url: tacoTruckApiUrl + '/locations'
        })
      },

      getById: function(Id) {
        return $http({
          method: 'GET',
          url: tacoTruckApiUrl + '/locations/' + Id
        })
      },

      create: function(location, token) {
          return $http({
            method: 'POST',
            url: tacoTruckApiUrl + '/locations',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            data: location
          })
      },

      deleteById: function(locationId, token) {
        return $http({
          method: 'DELETE',
          url: tacoTruckApiUrl + '/locations/' + locationId,
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      }
    };

  });
