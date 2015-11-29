const test_locations = [{id:625, name:"Test", city:"Anytown", state:"GA", country:"USA", description:"Love my test", created_at:"2015-11-25T14:36:11.734Z", updated_at:"2015-11-25T14:36:11.734Z"}];
const test_items = [{id:9, location_id:625, name:"Durable Rubber Pants", description:"Officiis similique nulla. Minima necessitatibus nobis beatae. Nihil dolore sit illum esse animi eius. Facere ab sed accusamus impedit.", created_at:"2015-11-23T03:19:35.611Z", updated_at:"2015-11-23T03:19:35.611Z"},
                    {id:10, location_id:625, name:"Aerodynamic Linen Watch", description:"Temporibus error ipsam culpa et corporis atque. Molestiae earum sed odio ut in atque incidunt. Quas eos pariatur labore maiores non eligendi odio. Vero quia consequatur ut distinctio.", created_at:"2015-11-23T03:19:35.614Z", updated_at:"2015-11-23T03:19:35.614Z"},
                    {id:13, location_id:625, name:"Heavy Duty Steel Bench", description:"Est totam ex temporibus perferendis rerum. Est facilis ea asperiores dolore voluptatem. Qui sed aut repellat porro ut est velit. Et expedita qui ad repudiandae sed aut non.", created_at:"2015-11-23T03:19:35.619Z", updated_at:"2015-11-23T03:19:35.619Z"}];
const test_reviews = [{id:34, item_id:"9", description:"good stuff", rating:5, created_at:"2015-11-25T21:55:32.883Z", updated_at:"2015-11-25T21:55:32.883Z"}];

angular.module('tacoTruck', ['ngRoute'])

  .controller('locationController', function($scope, $http, $route, $location, $routeParams) {


    $scope.getAllLocations = function() {
      console.log('getting location information');
      $http({
        method: 'GET',
        url: 'http://localhost:3000//api/v1/locations'
      })
        .then(function(response) {
          $scope.locations = response.data;
        })

    };
    $scope.location = {};
    $scope.submitForm = function(response){
      console.log('posting location information');
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/locations',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $scope.location
      }).then(function(response) {
        $scope.locations.push(response.data);
      })
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

  .controller('itemController', function($scope, $http, $route, $routeParams) {

    $scope.getAllItems = function() {
      console.log('getting item information');
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/locations/' + $routeParams.location_id + '/items'
      })
        .then(function(response) {
          $scope.items = response.data;
        })

    };
    $scope.location = {};
    $scope.submitForm = function(){
      console.log('posting item information');
      $scope.item.location_id = $routeParams.location_id
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/locations/' + $routeParams.location_id + '/items',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $scope.item
      })
      $scope.items.push(response.data);
    };

    console.log('itemCont');
    console.log($route);
    console.log($routeParams)
    //$scope.location = test_locations[0];
    $scope.params = $routeParams;
    $scope.getAllItems();
  })

  .controller('reviewController', function($scope, $http, $route, $routeParams) {

    $scope.getAllReviews = function() {
      console.log('getting item information');
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/v1/locations/' + $routeParams.location_id + '/items/' + $routeParams.item_id + '/reviews'
      })
        .then(function(response) {
          $scope.reviews = response.data;
        })

    };
    $scope.location = {};
    $scope.submitForm = function(){
      console.log('posting item information');
      $scope.review.item_id = $routeParams.item_id
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/locations/' + $routeParams.location_id + '/items/' + $routeParams.item_id + '/reviews',
        headers: {
          'Content-Type': 'application/json'
        },
        data: $scope.review
      })
      $scope.reviews.push(response.data);
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