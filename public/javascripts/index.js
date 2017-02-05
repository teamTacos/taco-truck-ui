const test_locations = [{id:625, name:"Test", city:"Anytown", state:"GA", country:"USA", description:"Love my test", created_at:"2015-11-25T14:36:11.734Z", updated_at:"2015-11-25T14:36:11.734Z"}];
const test_items = [{id:9, location_id:625, name:"Durable Rubber Pants", description:"Officiis similique nulla. Minima necessitatibus nobis beatae. Nihil dolore sit illum esse animi eius. Facere ab sed accusamus impedit.", created_at:"2015-11-23T03:19:35.611Z", updated_at:"2015-11-23T03:19:35.611Z"},
                    {id:10, location_id:625, name:"Aerodynamic Linen Watch", description:"Temporibus error ipsam culpa et corporis atque. Molestiae earum sed odio ut in atque incidunt. Quas eos pariatur labore maiores non eligendi odio. Vero quia consequatur ut distinctio.", created_at:"2015-11-23T03:19:35.614Z", updated_at:"2015-11-23T03:19:35.614Z"},
                    {id:13, location_id:625, name:"Heavy Duty Steel Bench", description:"Est totam ex temporibus perferendis rerum. Est facilis ea asperiores dolore voluptatem. Qui sed aut repellat porro ut est velit. Et expedita qui ad repudiandae sed aut non.", created_at:"2015-11-23T03:19:35.619Z", updated_at:"2015-11-23T03:19:35.619Z"}];
const test_reviews = [{id:34, item_id:"9", description:"good stuff", rating:5, created_at:"2015-11-25T21:55:32.883Z", updated_at:"2015-11-25T21:55:32.883Z"}];

angular.module('tacoTruck', ['ngRoute', 'FacebookProvider', 'photoAlbumControllers', 'cloudinary'])


  .run(function ($rootScope) {
    $rootScope.loginStatus = '';
    window.fbAsyncInit = function () {
      FB.init({
        // appId:'882041521930702', //development//
        appId:'881500085318179', //production//
        status:true,
        cookie:true,
        xfbml:true,
        version: 'v2.8'
      });

      FB.getLoginStatus(function(response) {
        $rootScope.fb_status = response.status;
        if($rootScope.fb_status == 'connected') {
          $('#add').show();
        } else {
          $('#add').hide();
        }
        $rootScope.$apply();
      });

      FB.Event.subscribe('auth.statusChange', function(response) {
        $rootScope.$broadcast("fb_statusChange", {'status': response.status, 'facebook_id': response.authResponse.userID});
      });



    };

    (function (d) {
      var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      ref.parentNode.insertBefore(js, ref);
    }(document));

  })

  .controller('locationController', function($rootScope, $scope, $http, $route, $location, $routeParams, tacoTruckApiUrl) {

    if($rootScope.fb_status == 'connected') {
      $('#add').show();
    } else {
      $('#add').hide();
    }

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
          $scope.locations.forEach(function(location){
            location.all_images.forEach(function(image){
              if(image.location_banner === 1) {
                location.thumbnail = image.cloudinary_id;
              }
            })
          })
        })

    };

    $scope.submitForm = function(response){
      $("#addModal").modal('hide');
      console.log('posting location information');
      console.log($scope.location);
      $scope.location.created_by = $rootScope.fb_userID;
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
          'Content-Type': 'application/json'
        },
        data: $scope.location
      }).success(function(response) {
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
              'Content-Type': 'application/json'
            },
            data: {location_id: $scope.new_location_id, location_banner: true, cloudinary_id: $rootScope.photos[0].public_id}
          }).then(function() {
            $scope.getAllLocations();
          })
        }
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

  .controller('itemController', function($rootScope, $scope, $http, $route, $routeParams, tacoTruckApiUrl) {

    if($rootScope.fb_status == 'connected') {
      $('#add').show();
    } else {
      $('#add').hide();
    }

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
      $scope.item.created_by = $rootScope.fb_userID;
      if($rootScope.photos) {
        $scope.item.thumbnail = $rootScope.photos[0].public_id;
      } else {
        $scope.item.thumbnail = '';
      }

      console.log($scope.item);

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

  .controller('reviewController', function($rootScope, $scope, $http, $route, $routeParams, tacoTruckApiUrl) {

    if($rootScope.fb_status == 'connected') {
      $('#add').show();
    } else {
      $('#add').hide();
    }

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
    $scope.getItemById = function() {
      console.log('getting item information');
      $http({
        method: 'GET',
        url: tacoTruckApiUrl + '/locations/' + $routeParams.location_id + '/items/' + $routeParams.item_id
      })
        .then(function(response) {
          $scope.item = response.data;
        })

    };
    $scope.location = {};
    $scope.submitForm = function(response){
      $("#addModal").modal('hide');
      console.log('posting review information');
      $scope.review.item_id = $routeParams.item_id;
      $scope.review.created_by = $rootScope.fb_userID;

      console.log($scope.review);

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
    $scope.getItemById();
    $scope.getAllReviews();
  })

  .controller('appCtrl', function(Facebook, $scope, $rootScope, $http, $location) {

    $rootScope.$on("fb_statusChange", function (event, args) {
      console.log("status changed: " + args.status);
      if(args.status == 'connected') {
        $('#add').show();
      } else {
        $('#add').hide();
      }
      $rootScope.fb_status = args.status;
      $rootScope.fb_userID = args.facebook_id;
      console.log(Object.keys(args));
      $rootScope.$apply();
    });

  })

  .config(function($routeProvider, $locationProvider, cloudinaryProvider) {
    cloudinaryProvider
      .set("cloud_name", "dfavubcrx")
      .set("upload_preset", "xdi4oxap");

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
