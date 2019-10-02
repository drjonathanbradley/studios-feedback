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
  submit_timeout(30000)
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
  submit_timeout(30000)
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

$('.subchoice').on('click', function() {
  clearTimeout(timer)
  json.resource[0].message = $(this)
    .children('.subchoice-text')
    .children('.choice-text')
    .text()
  console.log(json.resource[0].message)
  thankYou()
  submit_timeout(15000)
})

// Turns the popup screen into thank-you message
function thankYou() {
  $('aside, .message').fadeOut('slow', function() {
    $('summary')
      .fadeIn()
      .css('display', 'flex')
  })
}

// Timeout variable
var timer

// Timeout for idle after-submission screen
// Also used for the timeout that starts after clicking smiley or frowny face
function submit_timeout(time) {
  timer = setTimeout(function() {
    submit_data()
  }, time)
}

// Submitting data
function submit_data() {
  console.log('Submission begun')
  $.ajax({
    type: 'POST',
    url: config.url,
    headers: {
      'X-DreamFactory-Api-Key': config.key,
    },
    data: json,
  })
    .done(function() {
      console.log('Successful')
      location.reload(true)
    })
    .fail(function(err) {
      console.log(err)
      alert('There has been an error: ' + err)
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
