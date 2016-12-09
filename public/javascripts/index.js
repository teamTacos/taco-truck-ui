const test_locations = [{id:625, name:"Test", city:"Anytown", state:"GA", country:"USA", description:"Love my test", created_at:"2015-11-25T14:36:11.734Z", updated_at:"2015-11-25T14:36:11.734Z"}];
const test_items = [{id:9, location_id:625, name:"Durable Rubber Pants", description:"Officiis similique nulla. Minima necessitatibus nobis beatae. Nihil dolore sit illum esse animi eius. Facere ab sed accusamus impedit.", created_at:"2015-11-23T03:19:35.611Z", updated_at:"2015-11-23T03:19:35.611Z"},
                    {id:10, location_id:625, name:"Aerodynamic Linen Watch", description:"Temporibus error ipsam culpa et corporis atque. Molestiae earum sed odio ut in atque incidunt. Quas eos pariatur labore maiores non eligendi odio. Vero quia consequatur ut distinctio.", created_at:"2015-11-23T03:19:35.614Z", updated_at:"2015-11-23T03:19:35.614Z"},
                    {id:13, location_id:625, name:"Heavy Duty Steel Bench", description:"Est totam ex temporibus perferendis rerum. Est facilis ea asperiores dolore voluptatem. Qui sed aut repellat porro ut est velit. Et expedita qui ad repudiandae sed aut non.", created_at:"2015-11-23T03:19:35.619Z", updated_at:"2015-11-23T03:19:35.619Z"}];
const test_reviews = [{id:34, item_id:"9", description:"good stuff", rating:5, created_at:"2015-11-25T21:55:32.883Z", updated_at:"2015-11-25T21:55:32.883Z"}];

angular.module('tacoTruck', ['ngRoute'])

  .controller('locationController', function($scope, $http, $route, $location, $routeParams, tacoTruckApiUrl) {

    $('#add').text('Add Location');
    $scope.location = {};
    $scope.getAllLocations = function() {
      console.log('getting location information from ' + tacoTruckApiUrl);
      $http({
        method: 'GET',
        url: tacoTruckApiUrl + '/locations'
      })
        .then(function(response) {
          $scope.locations = response.data;
        })

    };

    $scope.submitForm = function(response){
      $("#addModal").modal('hide');
      console.log('posting location information');
      $http({
        method: 'POST',
        url: tacoTruckApiUrl + '/locations',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $scope.location
      }).then(function(response) {
        $scope.locations.push(response.data);
      })
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

  .controller('itemController', function($scope, $http, $route, $routeParams, tacoTruckApiUrl) {

    $('#add').text('Add Menu Item');
    $scope.getAllItems = function() {
      console.log('getting item information');
      $http({
        method: 'GET',
        url: tacoTruckApiUrl + '/locations/' + $routeParams.location_id + '/items'
      })
        .then(function(response) {
          $scope.items = response.data;
        })

    };
    $scope.getLocationById = function() {
      console.log('getting location information from ' + tacoTruckApiUrl);
      $http({
        method: 'GET',
        url: tacoTruckApiUrl + '/locations/' + $routeParams.location_id
      })
        .then(function(response) {
          $scope.location = response.data;
        })

    };
    $scope.submitForm = function(response){
      $("#addModal").modal('hide');
      console.log('posting item information');
      $scope.item.location_id = $routeParams.location_id;
      $http({
        method: 'POST',
        url: tacoTruckApiUrl + '/locations/' + $routeParams.location_id + '/items',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $scope.item
      }).then(function(response) {
        $scope.items.push(response.data);
      })
    };

    $scope.deleteItem = function(index) {
      console.log('deleting item ' + index);
      console.log($scope.items[index]);
      $http({
        method: 'DELETE',
        url: tacoTruckApiUrl + '/locations/' + $scope.items[index].location_id + '/items/' + $scope.items[index].id
      });
      $scope.items.splice(index, 1);
    };

    console.log('itemCont');
    console.log($route);
    console.log($routeParams);
    //$scope.location = test_locations[0];
    $scope.params = $routeParams;
    $scope.getLocationById();
    $scope.getAllItems();
  })

  .controller('reviewController', function($scope, $http, $route, $routeParams, tacoTruckApiUrl) {

    $('#add').text('Add Review');
    $scope.getAllReviews = function() {
      console.log('getting review information');
      $http({
        method: 'GET',
        url: tacoTruckApiUrl + '/locations/' + $routeParams.location_id + '/items/' + $routeParams.item_id + '/reviews'
      })
        .then(function(response) {
          $scope.reviews = response.data;
        })

    };
    $scope.location = {};
    $scope.submitForm = function(response){
      $("#addModal").modal('hide');
      console.log('posting review information');
      $scope.review.item_id = $routeParams.item_id;
      $http({
        method: 'POST',
        url: tacoTruckApiUrl + '/locations/' + $routeParams.location_id + '/items/' + $routeParams.item_id + '/reviews',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $scope.review
      }).then(function(response) {
        $scope.reviews.push(response.data);
      })
    };

    $scope.deleteReview = function(index) {
      console.log('deleting review ' + index);
      console.log($scope.reviews[index]);
      $http({
        method: 'DELETE',
        url: tacoTruckApiUrl + '/locations/' + $scope.reviews[index].location_id + '/items/' + $scope.reviews[index].item_id + '/reviews/' + $scope.reviews[index].id
      });
      $scope.reviews.splice(index, 1);
    };

    console.log('reviewCont');
    console.log($route);
    console.log($routeParams)
    //$scope.location = test_locations[0];
    //$scope.item = test_items[0];
    $scope.params = $routeParams;
    $scope.getAllReviews();
  })

  .config(function($routeProvider, $locationProvider) {
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