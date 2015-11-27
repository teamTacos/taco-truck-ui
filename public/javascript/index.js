const test_locations = [{id:625, name:"Test", city:"Anytown", state:"GA", country:"USA", description:"Love my test", created_at:"2015-11-25T14:36:11.734Z", updated_at:"2015-11-25T14:36:11.734Z"}];
const test_items = [{id:9, location_id:625, name:"Durable Rubber Pants", description:"Officiis similique nulla. Minima necessitatibus nobis beatae. Nihil dolore sit illum esse animi eius. Facere ab sed accusamus impedit.", created_at:"2015-11-23T03:19:35.611Z", updated_at:"2015-11-23T03:19:35.611Z"},
                    {id:10, location_id:625, name:"Aerodynamic Linen Watch", description:"Temporibus error ipsam culpa et corporis atque. Molestiae earum sed odio ut in atque incidunt. Quas eos pariatur labore maiores non eligendi odio. Vero quia consequatur ut distinctio.", created_at:"2015-11-23T03:19:35.614Z", updated_at:"2015-11-23T03:19:35.614Z"},
                    {id:13, location_id:625, name:"Heavy Duty Steel Bench", description:"Est totam ex temporibus perferendis rerum. Est facilis ea asperiores dolore voluptatem. Qui sed aut repellat porro ut est velit. Et expedita qui ad repudiandae sed aut non.", created_at:"2015-11-23T03:19:35.619Z", updated_at:"2015-11-23T03:19:35.619Z"}];
const test_reviews = [{id:34, item_id:"9", description:"good stuff", rating:5, created_at:"2015-11-25T21:55:32.883Z", updated_at:"2015-11-25T21:55:32.883Z"}];

angular.module('tacoTruck', ['ngRoute'])

  .controller('locationController', function($scope, $route, $location, $routeParams) {
    console.log('locationCont');
    console.log($route);
    console.log($routeParams);
    console.log($location.path());
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $scope.locations = test_locations;
    $scope.params = $routeParams;
  })

  .controller('itemController', function($scope, $route, $routeParams) {
    console.log('itemCont');
    console.log($route);
    console.log($routeParams)
    //$scope.location = test_locations[0];
    $scope.items = test_items;
    $scope.params = $routeParams;
  })

  .controller('reviewController', function($scope, $route, $routeParams) {
    console.log('reviewCont');
    console.log($route);
    console.log($routeParams)
    //$scope.location = test_locations[0];
    //$scope.item = test_items[0];
    $scope.reviews = test_reviews;
    $scope.params = $routeParams;
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