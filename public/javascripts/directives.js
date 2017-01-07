function showDelete (element) {
  $(element).addClass('show-delete');
}

function hideDelete (element) {
  $(element).removeClass('show-delete');
}

angular.module('tacoTruck')

  .directive('locationsListItem', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/locations-list-item.html',
      link: function(scope, element) {
        element.parent().on('swipeleft', function() { showDelete(this) });
        element.parent().on('swiperight', function() { hideDelete(this) });
        element.parent().on('click', function() { hideDelete(this) });
      }
    }
  })

  .directive('itemsListItem', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/items-list-item.html',
      link: function(scope, element) {
        element.parent().on('swipeleft', function() { showDelete(this) });
        element.parent().on('swiperight', function() { hideDelete(this) });
        element.parent().on('click', function() { hideDelete(this) });
      }
    }
  })

  .directive('reviewsListItem', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/reviews-list-item.html',
      link: function(scope, element) {
        element.parent().on('swipeleft', function() { showDelete(this) });
        element.parent().on('swiperight', function() { hideDelete(this) });
        element.parent().on('click', function() { hideDelete(this) });
      }
    }
  })

  .directive('imageSlider', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/image-slider.html',
      link: function(scope, element) {
        var swiper = new Swiper('.swiper-container', {
          slidesPerView: 3,
          slidesPerColumnFill: 'column'
        });
      }
    }
  });

