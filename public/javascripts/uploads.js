'use strict';

/* Controllers */

angular.module('photoAlbumControllers', ['ngFileUpload'])

.controller('photoUploadCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Upload', 'cloudinary',
  /* Uploading with Angular File Upload */
  function($scope, $rootScope, $routeParams, $location, $upload, cloudinary) {
    var d = new Date();
    $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
    console.log('are you even trying ....');
    //$scope.$watch('files', function() {
    $scope.uploadFiles = function(files){
      console.log('clicky .. clicky ... ');
      $('#submit-location').attr('disabled', 'disabled');
      $scope.files = files;
      console.log('files= ' + files);
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'tacoTruck',
              context: 'photo=' + $scope.title + '|created-by=' + $rootScope.fb_userID + '|location=' + $routeParams.location_id,
              file: file
            }
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            //file.status = "Uploading... " + file.progress + "%";
          }).success(function (data, status, headers, config) {
            console.log('success?');
            $rootScope.photos = $rootScope.photos || [];
            data.context = {custom: {photo: $scope.title}};
            file.result = data;
            $rootScope.photos.push(data);
            $('#submit-location').removeAttr('disabled');
          }).error(function (data, status, headers, config) {
            console.log('no dice');
            file.result = data;
          });
        }
      });
    };

    $scope.updateContext = function(){

    };

    $scope.cancelThumb = function(){
      console.log('cancel photo stuff');
      if($rootScope.photos) {
        console.log($rootScope.photos);
        $rootScope.photos.forEach(function(photo, i){
          $.cloudinary.delete_by_token(photo.delete_token);
          $rootScope.photos.splice(i, 1);
        });
      }

      $scope.files = '';
    };
    //});

  }]);