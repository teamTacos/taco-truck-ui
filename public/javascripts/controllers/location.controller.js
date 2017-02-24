angular.module('tacoTruck')

.controller('locationController', function($rootScope, $scope, $http, $route, $location, $routeParams, tacoTruckApiUrl, Locations) {

  var addButton = $('#add');

  if($rootScope.fb_status == 'connected') {
    addButton.show();
  } else {
    addButton.hide();
  }

  addButton.text('Add Location');
  $scope.location = {};
  $scope.getAllLocations = function() {
    console.log('getting location information from ' + tacoTruckApiUrl);
    Locations.getAll().then(function(response) {
      $scope.locations = response.data;
      $scope.locations.forEach(function(location){
        location.all_images.forEach(function (image) {
          if (image.location_banner === 1) {
            location.thumbnail = image.cloudinary_id;
          }
        })
      })
    });

  };

  $scope.submitForm = function(response){
    $("#addModal").modal('hide');
    $rootScope.error = null;
    console.log('posting location information');
    console.log($scope.location);
    //$scope.location.user_id = $rootScope.fb_userID;
    console.log('photos== ' + $rootScope.photos);
    // if($rootScope.photos) {
    //   $scope.location.thumbnail = $rootScope.photos[0].public_id;
    // } else {
    //   $scope.location.thumbnail = '';
    // }
    //post location data
    $http({
      method: 'POST',
      url: tacoTruckApiUrl + '/locations',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + $rootScope.token
      },
      data: $scope.location
    }).then(function(response) {
      console.log(response);
      //$scope.location.id = response.data.id;
      $scope.new_location_id = response.id;
      console.log('id:: ' + $scope.new_location_id);
      $scope.locations.push(response);

      if($rootScope.photos) {
        console.log('got photos?');
        console.log($scope.location);

        $http({
          method: 'POST',
          url: tacoTruckApiUrl + '/images',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + $rootScope.token
          },
          data: {location_id: $scope.new_location_id, location_banner: true, cloudinary_id: $rootScope.photos[0].public_id}
        }).then(function() {
          $scope.getAllLocations();
        })
      }
    }, function(response) {
      console.log(response);
      $rootScope.error = response.status + ' - ' + response.statusText;
    });

    //post image data
    // if($rootScope.photos) {
    //   console.log('got photos?');
    //   console.log($scope.location);
    //
    //   $http({
    //     method: 'POST',
    //     url: tacoTruckApiUrl + '/images',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: {location_id: $scope.new_location_id, location_banner: true, cloudinary_id: $rootScope.photos[0].public_id}
    //   }).then(function() {
    //     $scope.getAllLocations();
    //   })
    // }
    //post image data

  };

  $scope.deleteLocation = function(index) {
    console.log('deleting location ' + index);
    console.log($scope.locations[index]);
    $http({
      method: 'DELETE',
      url: tacoTruckApiUrl + '/locations/' + $scope.locations[index].id
    });
    $scope.locations.splice(index, 1);
  };

  console.log('locationCont');
  console.log($route);
  console.log($routeParams);
  console.log($location.path());
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  $scope.params = $routeParams;
  $scope.getAllLocations();

})