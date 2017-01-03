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
              context: 'photo=' + $scope.title,
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
          }).error(function (data, status, headers, config) {
            console.log('no dice');
            file.result = data;
          });
        }
      });
    };
    //});

  }]);