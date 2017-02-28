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
        appId:'882041521930702', //development//
        //appId:'881500085318179', //production//
        status:true,
        cookie:true,
        xfbml:true,
        version: 'v2.8'
      });

       FB.getLoginStatus(function(response) {
         console.log(response);
         var facebook_id = '';
         if (response.authResponse) {
           facebook_id = response.authResponse.userID;
         }
         $rootScope.$broadcast("fb_statusChange", {'status': response.status, 'facebook_id': facebook_id});
       });

      FB.Event.subscribe('auth.statusChange', function(response) {
        console.log('are we here yet?');
        if (response.status == 'connected') {
          $rootScope.fb_userID = response.authResponse.userID;
          $rootScope.token = response.authResponse.accessToken;
        } else {
          $rootScope.fb_userID = '';
          $rootScope.token = '';
        }
        $rootScope.fb_status = response.status;
        $rootScope.$broadcast("fb_statusChange", {'status': $rootScope.fb_status, 'facebook_id': $rootScope.fb_userID});
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

  .controller('appCtrl', function(Facebook, $scope, $rootScope, $http, $location) {

    var addButton = $('#add');
    $rootScope.$on("fb_statusChange", function(event, args) {
      if(args.status == 'connected') {
        addButton.show();
      } else {
        addButton.hide();
      }
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
