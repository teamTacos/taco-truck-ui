$(document).ready(function(){
  $("#add").click(function(){
    $("#add-modal").show();
  });

  $('.handle').click(function() {
    $('body').toggleClass('slide');
  });

  console.log('boom');
  var mySwiper = new Swiper ('.swiper-container', {
    scrollbar: '.swiper-scrollbar',
    scrollbarHide: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    grabCursor: true
  });
  console.log(mySwiper);
});

