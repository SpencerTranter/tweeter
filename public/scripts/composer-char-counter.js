$(document).ready(function() {
  $(".new-tweet").on('keyup', 'textarea', function() {
    var counter = $(this).parent().find('.counter');
    var value = +$(this).val().length;
    if(140 - value < 0 || 140 - value === 140){
      counter.addClass('red');
      $(this).parent().find('input').attr("disabled", true);
      counter.text(140 - value);
    } else {
      $(this).parent().find('input').attr("disabled", false);
      counter.removeClass('red');
      counter.text(140 - value);
    }
  })
});