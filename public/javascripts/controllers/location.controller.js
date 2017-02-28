angular.module('tacoTruck')

  .controller('locationController', function ($rootScope, $scope, $http, $route, $location, $routeParams, tacoTruckApiUrl, Images, Locations) {

    $('#add').text('Add Location');
    $scope.location = {};
    $scope.getAllLocations = function () {

      Locations.getAll()
        .then(function (response) {
          $scope.locations = response.data;
          $scope.locations.forEach(function (location) {
            location.all_images.forEach(function (image) {
              if (image.location_banner === 1) {
                location.thumbnail = image.cloudinary_id;
              }
            })
          })
        })
        .catch(function (data) {
          $rootScope.error = data.status + ' - ' + data.statusText;
        })
    };

    $scope.submitForm = function () {
      $("#addModal").modal('hide');
      $rootScope.error = null;

      Locations.create($scope.location, $rootScope.token)
        .then(function (response) {
          // $scope.location.id = response.data.id;
          $scope.locations.push(response);

          if ($rootScope.photos) {
            console.log('got photos?');
            console.log($scope.location);
            imageData = {
              location_id: response.data.id,
              location_banner: true,
              cloudinary_id: $rootScope.photos[0].public_id
            };
            console.log(imageData);
            Images.create(imageData, $rootScope.token)
              .then(function(response){
                $scope.getAllLocations();
              })
              .catch(function(data){
                $rootScope.error = data.status + ' - ' + data.statusText;
              });
          }
        })
        .catch(function (data) {
          console.log(data);
          $rootScope.error = data.status + ' - ' + data.statusText;
        })
    };

    $scope.deleteLocation = function (index) {
      Locations.deleteById($scope.locations[index].id, $rootScope.token);
      $scope.locations.splice(index, 1);
    };

    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.params = $routeParams;
    $scope.getAllLocations();

  });