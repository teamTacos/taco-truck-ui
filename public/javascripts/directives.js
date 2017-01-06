angular.module('tacoTruck')

  .directive('test', function(){

    return {
      restrict: 'E',
      templateUrl: 'location-item.html',
      link: function(scope, element) {
        element.parent().on('swipeleft', function() {$(this).addClass('show-delete')});
        element.parent().on('swiperight', function() {$(this).removeClass('show-delete')});
        element.parent().on('click', function() {$(this).removeClass('show-delete')});
      }
    }
  });

