angular.module('tacoTruck')

  .factory('Items', function ($http, tacoTruckApiUrl) {

    return {
      getAll: function (locationId) {
        return $http({
          method: 'GET',
          url: tacoTruckApiUrl + '/locations/' + locationId + '/items'
        })
      },

      getByLocationId: function(locationId) {
        return $http({
          method: 'GET',
          url: tacoTruckApiUrl + '/locations/' + locationId
        })
      },

      getById: function(locationId, itemId) {
        return $http({
          method: 'GET',
          url: tacoTruckApiUrl + '/locations/' + locationId + '/items/' + itemId
        })
      },

      create: function(locationId, item, token) {
        return $http({
          method: 'POST',
          url: tacoTruckApiUrl + '/locations/' + locationId + '/items',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          data: item
        })
      },

      deleteById: function(locationId, itemId, token) {
        return $http({
          method: 'DELETE',
          url: tacoTruckApiUrl + '/locations/' + locationId + '/items/' + itemId,
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      }
    };

  });