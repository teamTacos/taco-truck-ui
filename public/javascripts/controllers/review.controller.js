angular.module('tacoTruck')

  .controller('reviewController', function ($rootScope, $scope, $http, $route, $routeParams, tacoTruckApiUrl, Images, Reviews, Items) {

    $('#add').text('Add Review');
    $scope.getAllReviews = function () {
      console.log('getting review information');
      Reviews.getAll($routeParams)
        .then(function (response) {
          $scope.reviews = response.data;
        })
    };
    $scope.getItemById = function () {
      console.log('getting item information');
      Items.getById($routeParams.location_id, $routeParams.item_id)
        .then(function (response) {
          $scope.item = response.data;
        })
    };
    $scope.location = {};
    $scope.submitForm = function (response) {
      $("#addModal").modal('hide');
      $rootScope.error = null;
      console.log('posting review information');
      $scope.review.item_id = $routeParams.item_id;

      console.log($scope.review);
      Reviews.create($scope.review, $routeParams, $rootScope.token)
        .then(function (response) {
          $scope.reviews.push(response.data);
        })
        .catch(function (data) {
          $rootScope.error = data.status + ' - ' + data.statusText;
        })
    };

    $scope.deleteReview = function (index) {
      $rootScope.error = null;
      Reviews.delete($scope.reviews[index], $rootScope.token)
        .then(function (response) {
          $scope.reviews.splice(index, 1);
        })
        .catch(function (data) {
          $rootScope.error = data.status + ' - ' + data.statusText;
        })
    };

    console.log('route');
    console.log($route);
    console.log('params');
    console.log($routeParams);
    $scope.params = $routeParams;
    $scope.getItemById();
    $scope.getAllReviews();
  });