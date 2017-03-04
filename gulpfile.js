'use strict';

var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');

var configureSetup  = {
  createModule: false,
  constants: {
    tacoTruckApiUrl: process.env.TACO_TRUCK_API_URL,
    facebookAppId: process.env.FACEBOOK_APP_ID
  }
};

gulp.task('config', function() {
  gulp.src('config.json')
    .pipe(gulpNgConfig('tacoTruck', configureSetup))
    .pipe(gulp.dest('public/javascripts'));
});