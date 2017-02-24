
angular.module('tacoTruck')

.factory('Locations', function($http, tacoTruckApiUrl){

  var getAll = function(){
    return $http({
      method: 'GET',
      url: tacoTruckApiUrl + '/locations'
    })
  };

  return {
    getAll: getAll
  }

});
