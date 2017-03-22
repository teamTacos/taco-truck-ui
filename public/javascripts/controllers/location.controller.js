angular.module('tacoTruck')

  .controller('locationController', function ($rootScope, $scope, $filter, $http, $route, $location, $routeParams, tacoTruckApiUrl, Images, Locations, Users) {

    $('#add').text('Add Location');

    $rootScope.$on("fb_statusChange", function(event, args) {
      console.log('uid=' + $rootScope.user_id);
      Users.getFavorites($rootScope.user_id, $rootScope.token)
        .then(function(response) {
          console.log(response.data);
          response.data.forEach(function(favorite){
            console.log(favorite.location_id);
             if (favorite.location_id) {
               console.log('this is my favorite');
               var location = $filter('filter')($scope.locations, {'id':favorite.location_id}, true)[0];
               location.isFavorite = true;
               location.favoriteId = favorite.id;
               console.log(location);
             }
           });
        });
    });

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
            });

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

    $scope.addToFavorites = function(locationId, $event) {
      console.log(locationId);
      console.log($event);
      $event.stopPropagation();
      var favorite = {user_id: $rootScope.user_id, location_id: locationId};
      console.log(favorite);
      Users.addToFavorites(favorite, $rootScope.token)
        .then(function(response){
          console.log('favorite added');
          console.log(response)
        });
      location = $filter('filter')($scope.locations, {'id':locationId});
      location.isFavorite = true;
    };

    $scope.removeFromFavorites = function(favoriteId, $event) {
      console.log(favoriteId);
      console.log($event);
      $event.stopPropagation();
      favorite = {'id': favoriteId, 'user_id': $rootScope.user_id};
      Users.removeFromFavorites(favorite, $rootScope.token)
        .then(function(response){
          console.log('favorite removed');
          console.log(response)
        });
      location = $filter('filter')($scope.locations, {'favoriteId':favoriteId}, true)[0];
      location.favoriteId = null;
      location.isFavorite = false;
    };

    $scope.viewItems = function(locationId) {
      console.log('woot!');
    };

    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.params = $routeParams;
    $scope.getAllLocations();

  });