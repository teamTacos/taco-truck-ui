angular.module('tacoTruck')
.constant('tacoTruckApiUrl', "http://localhost:3000/api/v1")

.config(function($routeProvider, $locationProvider, cloudinaryProvider) {
  cloudinaryProvider
    .set("cloud_name", "dfavubcrx")
    .set("upload_preset", "xdi4oxap");

  $routeProvider
    .when('/', {
      templateUrl: '/pages/location.html',
      controller: 'locationController'
    })
    .when('/location/:location_id', {
      templateUrl: '/pages/item.html',
      controller: 'itemController'
    })
    .when('/location/:location_id/item/:item_id', {
      templateUrl: '/pages/review.html',
      controller: 'reviewController'
    })
    .otherwise({redirectTo: '/blah'});
  $locationProvider.html5Mode(true);
});
