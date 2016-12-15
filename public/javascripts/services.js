var app = angular.module('FacebookProvider', []);
app.factory('Facebook', function ($rootScope) {
  return {
    getLoginStatus:function () {
      console.log("getting login status ...");
      FB.getLoginStatus(function (response) {
        console.log("or here");
        $rootScope.$broadcast("fb_statusChange", {'status':response.status});
      }, true);
    }
  };
});

//https://github.com/Terumi/AngularJS-Facebook-Login
//
//for original code and docs ^^

