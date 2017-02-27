angular.module('tacoTruck')

  .factory('Locations', function ($http, tacoTruckApiUrl) {

    return {
      getAll: function () {
        return $http({
          method: 'GET',
          url: tacoTruckApiUrl + '/locations'
        });
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

      deleteById: function(location_id, token) {
        return $http({
          method: 'DELETE',
          url: tacoTruckApiUrl + '/locations/' + location_id,
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      }
    };


    // var add = function (location, token) {
    //   return $http({
    //     method: 'POST',
    //     url: tacoTruckApiUrl + '/locations',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer ' + token
    //     },
    //     data: location
    //   })
    // };
    //
    // var deleteById = function (location_id, token) {
    //   return $http({
    //     method: 'DELETE',
    //     url: tacoTruckApiUrl + '/locations/' + location_id,
    //     headers: {
    //       'Authorization': 'Bearer ' + token
    //     }
    //   });
    // };

    // return {
    //   getAll: getAll,
    //   add: add,
    //   deleteById: deleteById
    // }

  });
