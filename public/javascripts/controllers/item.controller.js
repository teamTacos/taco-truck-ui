angular.module('tacoTruck')

  .controller('itemController', function ($rootScope, $scope, $http, $route, $routeParams, tacoTruckApiUrl, Images, Items, Locations) {

    $('#add').text('Add Menu Item');
    $scope.getAllItems = function () {
      $rootScope.error = null;
      Items.getAll($routeParams.location_id)
        .then(function (response) {
          $scope.items = response.data;
          $scope.items.forEach(function (item) {
            item.all_images.forEach(function (image) {
              if (image.item_banner === 1) {
                item.thumbnail = image.cloudinary_id;
              }
            })
          })
        })
        .catch(function (data) {
          $rootScope.error = data.status + ' - ' + data.statusText;
        })

    };

    $scope.getLocationById = function () {
      $rootScope.error = null;
      Locations.getById($routeParams.location_id)
        .then(function (response) {
          $scope.location = response.data;
        })
        .catch(function (data) {
          $rootScope.error = data.status + ' - ' + data.statusText;
        })
    };

    $scope.submitForm = function (response) {
      $("#addModal").modal('hide');
      $rootScope.error = null;
      $scope.item.location_id = $routeParams.location_id;

      Items.create($routeParams.location_id, $scope.item, $rootScope.token)
        .then(function (response) {
          $scope.items.push(response.data);
          if ($rootScope.photos) {
            console.log('yay item photo');
            imageData = {
              item_id: response.data.id,
              item_banner: true,
              cloudinary_id: $rootScope.photos[0].public_id
            };
            console.log(imageData);
            Images.create(imageData, $rootScope.token)
              .then(function (response) {
                console.log(response);
                $scope.getAllItems();
              })
              .catch(function (data) {
                console.log(data);
                $rootScope.error = data.status + ' - ' + data.statusText;
              });
          }
        })
        .catch(function (data) {
          console.log(data);
          $rootScope.error = data.status + ' - ' + data.statusText;
        })

    };

    $scope.deleteItem = function (index) {
      $rootScope.error = null;
      item = $scope.items[index];
      Items.deleteById(item.location_id, item.id, $rootScope.token)
        .then(function (response) {
          $scope.items.splice(index, 1);
        })
        .catch(function (data) {
          $rootScope.error = data.status + ' - ' + data.statusText;
        })

    };

    console.log('itemCont');
    console.log($route);
    console.log($routeParams);
    $scope.params = $routeParams;
    $scope.getLocationById();
    $scope.getAllItems();

  });