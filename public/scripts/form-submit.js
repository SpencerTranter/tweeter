"use strict";

$(function(){

  $("#tweet-create").submit(function(e) {
      let url = "../../tweets";
      let $formText = $(this).find('textarea').val();
      let $textLength = $formText.length;

      if($formText === null || $formText === ''){
        alert('Error: cannot post empty tweet!');
      }else if ($textLength > 140){
        alert('Error: tweet too long!');
      }else {
        $.ajax({
               type: "POST",
               url: url,
               data: $("#tweet-create").serialize(),
               success: function(data) {
                $("tweet-create").submit();
               }
             });
      }
    e.preventDefault();
  });

});