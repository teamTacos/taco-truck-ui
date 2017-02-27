angular.module('tacoTruck')

  .controller('locationController', function ($rootScope, $scope, $http, $route, $location, $routeParams, tacoTruckApiUrl, Locations) {

    $('#add').text('Add Location');
    $scope.location = {};
    $scope.getAllLocations = function () {

      Locations.getAll()
        .then(function (response) {
          console.log(response);
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
          console.log(data.status);
          $rootScope.error = data.status + ' - ' + data.statusText;
        })
    };

    $scope.submitForm = function () {
      $("#addModal").modal('hide');
      $rootScope.error = null;

      Locations.create($scope.location, $rootScope.token)
        .then(function (response) {
          console.log(response.data);
          $scope.location.id = response.id;
          console.log('id:: ' + $scope.location.id);
          $scope.locations.push(response);

          if ($rootScope.photos) {
            console.log('got photos?');
            console.log($scope.location);

            $http({
              method: 'POST',
              url: tacoTruckApiUrl + '/images',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + $rootScope.token
              },
              data: {
                location_id: $scope.location.id,
                location_banner: true,
                cloudinary_id: $rootScope.photos[0].public_id
              }
            }).then(function () {
              $scope.getAllLocations();
            })
          }

        })
        .catch(function (data) {
          console.log(data);
          $rootScope.error = data.status + ' - ' + data.statusText;
        })
    };

    $scope.deleteLocation = function (index) {
      console.log('deleting location ' + index);
      console.log($scope.locations[index]);
      Locations.deleteById($scope.locations[index].id, $rootScope.token);
      $scope.locations.splice(index, 1);
    };

    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.params = $routeParams;
    $scope.getAllLocations();

  });