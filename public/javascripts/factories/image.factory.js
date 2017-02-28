angular.module('tacoTruck')

  .factory('Images', function ($http, tacoTruckApiUrl) {

    return {
      create: function(data, token) {
        return $http({
          method: 'POST',
          url: tacoTruckApiUrl + '/images',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          data: data
        })
      }
    }

  });