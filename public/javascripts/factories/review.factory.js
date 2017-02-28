angular.module('tacoTruck')

  .factory('Reviews', function ($http, tacoTruckApiUrl) {

    return {
      getAll: function (routeParams) {
        return $http({
          method: 'GET',
          url: tacoTruckApiUrl + '/locations/' + routeParams.location_id + '/items/' + routeParams.item_id + '/reviews'
        })
      },

      create: function(review, routeParams, token) {
        return $http({
          method: 'POST',
          url: tacoTruckApiUrl + '/locations/' + routeParams.location_id + '/items/' + routeParams.item_id + '/reviews',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          data: review
        })
      },

      delete: function(review, token) {
        return $http({
          method: 'DELETE',
          url: tacoTruckApiUrl + '/locations/' + review.location_id + '/items/' + review.item_id + '/reviews/' + review.id,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
      }
    }
  });