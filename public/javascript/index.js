var tacoTruck = angular.module('tacoTruck', []);


function locationsController($scope, $http) {
  $scope.formData = {};

  $http.get('http://localhost:3000/api/v1/locations')
    .success(function (data) {
      $scope.locations = data;
      console.log(data);
    })
    .error(function (data) {
      console.log('Error: ' + data);
    });
}

function locationsByIdController($scope, $http) {
  //$scope.formData = {};
  ////var locationElements = String(location).split("/");
  ////var location_id = locationElements[locationElements.length-1];
  //$http.get('http://localhost:3000/api/v1/locations/' + location_id)
  //  .success(function (data) {
  //    $scope.location = data;
  //    console.log(data);
  //  })
  //  .error(function (data) {
  //    console.log('Error: ' + data);
  //  });

}

function itemsController($scope, $http) {
  $scope.formData = {};
  var locationElements = String(location).split("/");
  $scope.location_id = locationElements[locationElements.length-1];

  $http.get('http://localhost:3000/api/v1/locations/' + $scope.location_id + '/items')
    .success(function (data) {
      $scope.items = data;
      console.log(data);
    })
    .error(function (data) {
      console.log('Error: ' + data);
    });
}

function reviewsController($scope, $http) {
  $scope.formData = {};
  var locationElements = String(location).split("/");
  var location_id = locationElements[locationElements.length-3];
  var item_id = locationElements[locationElements.length-1];

  $http.get('http://localhost:3000/api/v1/locations/' + location_id + '/items/' + item_id + '/reviews')
    .success(function (data) {
      $scope.reviews = data;
      console.log(data);
    })
    .error(function (data) {
      console.log('Error: ' + data);
    });
}