angular.module('tacoTruck')

  .factory('Users', function ($http, tacoTruckApiUrl) {

    return {

      getById: function (userId) {
        console.log(userId);
        return $http({
          method: 'GET',
          url: tacoTruckApiUrl + '/users/' + userId
        })
      },
      getByFBUserId: function (FBUserId) {
        console.log(FBUserId);
        return $http({
          method: 'GET',
          url: tacoTruckApiUrl + '/users?fb_user_id=' + FBUserId
        })
      },
      getFavorites: function (userId, token) {
        return $http({
          method: 'GET',
          url: tacoTruckApiUrl + '/users/' + userId + '/favorites',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
      },
      addToFavorites: function (favorite, token) {
        return $http({
          method: 'POST',
          url: tacoTruckApiUrl + '/users/' + favorite.user_id + '/favorites',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          data: favorite
        })
      },
      removeFromFavorites: function (favorite, token) {
        return $http({
          method: 'DELETE',
          url: tacoTruckApiUrl + '/users/' + favorite.user_id + '/favorites/' + favorite.id,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
      }

    }

  });
