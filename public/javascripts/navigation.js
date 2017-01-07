$(document).ready(function(){

  $.mobile.loading().hide();

  $('.handle').click(function() {
    $('body').toggleClass('slide');
  });

  $('.slide-menu').click(function() {
    $('body').toggleClass('slide');
  });

  $('.handle').on('swiperight', function(){
    console.log('handle jazz');
  });

});