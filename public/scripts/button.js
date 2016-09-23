"use strict";

$(function(){

  $('.button').on('click', function() {
    let create = $(this).parent().parent().find('.new-tweet');
    create.slideToggle();
    create.find('textarea').select();
  })

});