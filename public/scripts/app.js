"use strict";
$(function(){

  //Self invoking to load tweets on page load
  (function loadTweets(){
    $.ajax({
      url: '../../tweets',
      method: 'GET',
      success: function(tweets) {
        renderTweets(tweets);
      }
    });
  }());

  //Post request
  $("#tweet-create").submit(function(e) {
      let url = "/tweets";
      e.preventDefault();

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
             $('#tweets-container').prepend(createTweetElement(data));
           }
         });
      }
  });

  //Renders tweets to html documnt from an array of tweet objects
  function renderTweets(tweets) {
    tweets.reduce(function(container, curr) {
      container.append(createTweetElement(curr));
      return container;
    }, $('#tweets-container'));
  }

  //Clears tweets from html container
  function clearTweets(){
    $('#tweets-container').empty();
  }

  //Jquary creation of tweet forms
  function createTweetElement(data) {
    let $tweet = $('<article>');
    let $header = createTweetHeader(data.user);
    let $body = createTweetBody(data.content.text);
    let $footer = createTweetFooter(data.created_at);

    return $tweet.append($header, $body, $footer);
  }

  function createTweetHeader(user) {
    let $header = $('<header>');
    let $header_img = $('<img>').addClass('avatar');
    let $header_user = $('<p>').addClass('user');
    let $header_ID = $('<p>').addClass('user-ID');

    $header_img.attr('src', user.avatars.small);
    $header_user.text(user.name);
    $header_ID.text(user.handle);

    return $header.append($header_img, $header_user, $header_ID);
  }

  function createTweetBody(text) {
    let $body = $('<section>');
    let $content = $('<p>');

    $content.text(text);

    return $body.append($content);
  }

  function createTweetFooter(epochDate) {
    let $footer = $('<footer>');
    let $span = $('<span>').addClass('icon');
    let $p = $('<p>');

    $p.text(relativePastDateFromToday(epochDate));
    $span.append(createFAIcon('fa-flag'), createFAIcon('fa-retweet'), createFAIcon('fa-heart'));

    return $footer.append($span, $p);
  }

  //Takes in a font awesome icon name and gives the <i> tage with correct class
  function createFAIcon(iconName) {
    return '<i class="fa '+ iconName + '" aria-hidden="true"></i>';
  }

  //Compares todays date with epoch time stamp to get days back
  function relativePastDateFromToday(utc) {
    let currDate = new Date();
    let utcDate = new Date(utc);
    let millisecondsPerDay = 24*60*60*1000;
    let millisecondsPerHour = 60*60*1000;

    let daysApart = Math.round(Math.abs((utcDate.getTime() - currDate.getTime())/(millisecondsPerDay)));
    if(daysApart < 1){
      let hoursApart = Math.round(Math.abs((utcDate.getTime() - currDate.getTime())/(millisecondsPerHour)));
      return hoursApart + ' hours ago';
    }
    return daysApart + ' days ago';
  }

  $('#tweets-container').on('click', function (){
    alert('Tweet, Tweet!');
  });

});
