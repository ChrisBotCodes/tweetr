/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // fetch all tweets as soon as the page is ready
  fetchTweets();

  // add a submit listener on new tweet form
  let form = $('.container form');
  form.on('submit', function(event) {
    event.preventDefault();
    // flash message when submitting empty tweet
    if ($('#new-tweet-text').val().length === 0) {
      $('#notEnoughChars').fadeIn(500).css('display', 'inline').delay(1700).fadeOut(500);
    // flash message when submitting a tweet that is too large
    } else if ($('#new-tweet-text').val().length > 140) {
      $('#tooManyChars').fadeIn(500).css('display', 'inline').delay(1700).fadeOut(500);
    // successful submission when submitting a good tweet
    } else {
      // remove all tweets from page, post new tweet to db, fetch all tweets
      $('.tweet-container').empty();
      $.ajax('/tweets', {method: 'post', data: $('#new-tweet-text').serialize()})
      .then((result) => {
        fetchTweets();
      })
      .fail((error) => console.log(error))

      // clear the text area after submitting
      $('#new-tweet-text').val('');
    }
  });

  // toggles slide up/down & focuses on text area when clicking compose button
  $(".compose").on("click", function(event) {
    event.preventDefault();
    let $newTweetForm = $('section.new-tweet');
    let $newTweetText = $('#new-tweet-text');
    if ($newTweetForm.css('display') === 'none') {
      $newTweetForm.slideDown(300);
      $newTweetText.focus();
    } else {
      $newTweetForm.slideUp(300);
    }
  });
});



// avoid cross-site scripting
function esc(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function fetchTweets() {
  $.getJSON('/tweets')
  .then((tweets) => { renderTweets(tweets) })
}

function renderTweets(tweetsArray) {
  for (let tweetData of tweetsArray) {
    let individTweet = createTweetElement(tweetData);
    $("section.tweet-container").prepend(individTweet);
  }
}

// returns a tweet article
function createTweetElement(tweetObj) {
  let userName = tweetObj.user.name;
  let smallAvatar = tweetObj.user.avatars.small;
  let regAvatar = tweetObj.user.avatars.regular;
  let largeAvatar = tweetObj.user.avatars.large;
  let userHandle = tweetObj.user.handle;
  let contentText = tweetObj.content.text;
  let timeSincePost = timeSince(tweetObj.created_at);

  return `<article class="tweet">
            <header>
              <img class="tweet-avatar" src=${smallAvatar}>
              <h2>${esc(userName)}</h2>
              <h3>${esc(userHandle)}</h3>
            </header>
            <footer>
              <p>${esc(contentText)}</p>
              <h4>${timeSincePost}</h4>
              <div class='hover-icons'>
                <i class='hover-icon fa fa-flag'></i>
                <i class='hover-icon fa fa-retweet'></i>
                <i class='hover-icon fa fa-heart'></i>
              </div>
            </footer>
          </article>`
}

function timeSince(postTime) {
  let present = Date.now();
  let days = Math.floor((present - postTime) / 86400000);
  if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return `${days} day ago`;
  } else {
    let hours = Math.floor(((present - postTime) / 86400000) * 24);
    if (hours > 1) {
      return `${hours} hours ago`;
    } else if (hours === 1) {
      return `${hours} hour ago`;
    } else {
      return `less than 1 hour ago`;
    }
  }
}