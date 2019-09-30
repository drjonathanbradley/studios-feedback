// Set up data object/package to send to server
var json = {
  resource: [
    {
      rating: '',
      message: '',
    },
  ],
}

//---------- The functions of the smiley and frowny buttons ------------------------------------------------------/

// Modal
var modal = document.getElementById('smileyModal')

// Buttons that open the modal
var btn1 = document.getElementById('smileyButton')
var btn2 = document.getElementById('frownyButton')

// When the user clicks a button, open the modal
btn1.onclick = function() {
  json.resource[0].rating = 'Positive Experience'
  rollSmileyOut()
  submit_timeout()
  $('main').fadeOut('slow', function() {
    $('aside')
      .fadeIn()
      .css('display', 'flex')
    $('.message').text('What did you enjoy about your experience?')
  })
}

// When the user clicks a button, open the modal
btn2.onclick = function() {
  json.resource[0].rating = 'Negative Experience'
  rollFrownyOut()
  submit_timeout()
  $('.staff').text('Staff was Unhelpful')
  $('.tech').text("Didn't Have What I Needed")
  $('.avail').text('Technology was Broken')
  $('main').fadeOut('slow', function() {
    $('aside')
      .fadeIn()
      .css('display', 'flex')
    $('.message').text('What did you dislike about your experience?')
  })
}

// Turns the popup screen into thank-you message
function thankYou() {
  $('aside, .message').fadeOut('slow', function() {
    $('summary')
      .fadeIn()
      .css('display', 'flex')
  })
}

// Timeout variables
var five_sec, four_sec, three_sec, two_sec, one_sec, final_time
var countdown = document.getElementById('countdown')

// Timeout for idle feedback screen
function feedback_timeout() {
  clearTimeouts()
  five_sec = setTimeout(function() {
    countdown.innerHTML = 'Timeout in 5 seconds'
  }, 295000)
  four_sec = setTimeout(function() {
    countdown.innerHTML = 'Timeout in 4 seconds'
  }, 296000)
  three_sec = setTimeout(function() {
    countdown.innerHTML = 'Timeout in 3 seconds'
  }, 297000)
  two_sec = setTimeout(function() {
    countdown.innerHTML = 'Timeout in 2 seconds'
  }, 298000)
  one_sec = setTimeout(function() {
    countdown.innerHTML = 'Timeout in 1 second'
  }, 299000)
  final_time = setTimeout(function() {
    location.reload(true)
  }, 300000)
}

// Timeout for idle after-submission screen
// Also used for the timeout that starts after clicking smiley or frowny face
function submit_timeout() {
  clearTimeouts()
  five_sec = setTimeout(function() {
    countdown.innerHTML = 'Timeout in 5 seconds'
  }, 25000)
  four_sec = setTimeout(function() {
    countdown.innerHTML = 'Timeout in 4 seconds'
  }, 26000)
  three_sec = setTimeout(function() {
    countdown.innerHTML = 'Timeout in 3 seconds'
  }, 27000)
  two_sec = setTimeout(function() {
    countdown.innerHTML = 'Timeout in 2 seconds'
  }, 28000)
  one_sec = setTimeout(function() {
    countdown.innerHTML = 'Timeout in 1 second'
  }, 29000)
  final_time = setTimeout(function() {
    location.reload(true)
  }, 30000)
}

// Clear timeouts
function clearTimeouts() {
  if (five_sec != null && final_time != null) {
    clearTimeout(five_sec)
    clearTimeout(four_sec)
    clearTimeout(three_sec)
    clearTimeout(two_sec)
    clearTimeout(one_sec)
    clearTimeout(final_time)
    countdown.innerHTML = ''
  }
}

// Clicking submit button
function submit_data() {
  submit_timeout()
  if (submit_clickable) {
    json.resource.message = feedback.value
    if (json.left_feedback) makeModalSmaller()
    thankYou()
    modal_body.style.height = '25vh'
    fadeSubmit()
  }
  $.ajax({
    type: 'POST',
    url: config.url,
    headers: {
      'X-DreamFactory-Api-Key': config.key,
    },
    data: json,
  })
}

// Animations

// Rolls smiley button out
function rollSmileyOut() {
  btn1.style.animationDuration = '0.4s'
  btn2.style.animationName = 'none'
  btn1.style.animationName = 'rollSmileyOut'
  btn1.style.animationIterationCount = '1'
}

// Rolls frowny button out
function rollFrownyOut() {
  btn2.style.animationDuration = '0.4s'
  btn1.style.animationName = 'none'
  btn2.style.animationName = 'rollFrownyOut'
  btn2.style.animationIterationCount = '1'
}

// Fade submit button away
function fadeSubmit() {
  submit_button.style.animationDuration = '2s'
  submit_button.style.animationName = 'fadeOut'
}

// Make modal bigger
function makeModalBigger() {
  modal_body.style.animationDuration = '0.2s'
  modal_body.style.animationName = 'modalBigger'
}

// Make modal smaller
function makeModalSmaller() {
  modal_body.style.animationDuration = '0.2s'
  modal_body.style.animationName = 'modalSmaller'
}

//Make submit button bigger
function makeSubmitBigger() {
  submit_button.style.animationDuration = '0.2s'
  submit_button.style.animationName = 'submitBigger'
}

//Make footer bigger
function makeFooterBigger() {
  footer.style.animationDuration = '0.2s'
  footer.style.animationName = 'footerBigger'
}

// Move "Thank You" text
function makeThanksText() {
  thanks_text.style.animationDuration = '1s'
  thanks_text.style.animationName = 'center_text'
}
