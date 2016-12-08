$(document).ready(function(){
  $("#add").click(function(){
    $("#add-modal").show();
  });

  $('.handle').click(function() {
    $('body').toggleClass('slide');
  });
});

