// Set up data object/package to send to server
var json = {
	was_happy : null,
	left_feedback: false,
	feedback: null
};


//---------- The functions of the smiley and frowny buttons ------------------------------------------------------/


// Modal
var modal = document.getElementById("smileyModal");

// Buttons that open the modal
var btn1 = document.getElementById("smileyButton");
var btn2 = document.getElementById("frownyButton");

// The <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks a button, open the modal 
btn1.onclick = function() {
	json.was_happy = true;
	modal.style.display = "block";
	rollSmileyOut();
}

// When the user clicks a button, open the modal
btn2.onclick = function() {
	json.was_happy = false;
	modal.style.display = "block";
	rollFrownyOut();
}

// Rolls smiley button out 
function rollSmileyOut () {
	btn1.style.animationDuration = "0.4s";
	btn1.style.animationName = "rollSmileyOut";
}

// Rolls frowny button out 
function rollFrownyOut () {
	btn2.style.animationDuration = "0.4s";
	btn2.style.animationName = "rollFrownyOut";
}

// Rolls smiley button in
function rollSmileyIn () {
	btn1.style.animationDuration = "0.4s";
	btn1.style.animationName = "rollSmileyIn";
}

// Rolls frowney button in 
function rollFrownyIn () {
	btn2.style.animationDuration = "0.4s";
	btn2.style.animationName = "rollFrownyIn";
}

// When the user clicks on <span> (x), reload the page
span.onclick = function() {
	location.reload(true);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
		if (btn1.style.animationName == "rollSmileyOut") {
			rollSmileyIn();
		}
		if (btn2.style.animationName == "rollFrownyOut") {
			rollFrownyIn();
		}
	}
}


//---------- The functions in the feedback dropdown (after is has been opened) ------------------------------------------------------/


// Yes, no, and submit buttons
var yes = document.getElementById("yes_feedback");
var no = document.getElementById("no_feedback");
var submit_button = document.getElementById("submit");

// Variable for identifying when submit should be clickable
var submit_clickable = false;

// Feedback box, modal body, and "Thank You" text
var modal_body = document.getElementsByClassName("modal-body")[0];
var feedback = document.getElementById("feedback");
var thanks_text = document.getElementById("main_statement");
var footer = document.getElementsByClassName("modal-footer")[0];

// Make the initial text go away when feedback box is clicked on
var firstClick = true;
feedback.onclick = function() {
	feedback_timeout();
	if (firstClick) {
		feedback.innerHTML = "";
	}
	firstClick = false;
}

// Clicking yes to leave feedback
yes.onclick = function() {
	json.left_feedback = true;
	feedback.style.display = "inline";
	yes.style.display = "none";
	no.style.display = "none";
	submit_clickable = true;
	submit_button.style.opacity = 1;
	submit_button.style.cursor = "pointer";
	modal_body.style.height = "40vh";
	makeSubmitBigger();
	makeFooterBigger();
	makeModalBigger();
}

// Clicking no to leave feedback
no.onclick = function() {
	json.left_feedback = false;
	no.style.display = "none";
	yes.style.display = "none";
	fadeSubmit();
	thankYou();
	submit();
}

// Fade submit button away 
function fadeSubmit() {
	submit_button.style.animationDuration = "2s";
	submit_button.style.animationName = "fadeOut";
}

// Make modal bigger
function makeModalBigger() {
	modal_body.style.animationDuration = "0.2s";
	modal_body.style.animationName = "modalBigger";
}

// Make modal smaller
function makeModalSmaller() {
	modal_body.style.animationDuration = "0.2s";
	modal_body.style.animationName = "modalSmaller";
}

//Make submit button bigger
function makeSubmitBigger() {
	submit_button.style.animationDuration = "0.2s";
	submit_button.style.animationName = "submitBigger";
}

//Make footer bigger
function makeFooterBigger() {
	footer.style.animationDuration = "0.2s";
	footer.style.animationName = "footerBigger";
}

// Turns the popup screen into thank-you message
function thankYou() {
	yes.style.display = "none";
	no.style.display = "none";
	feedback.style.display = "none";
	submit_button.style.cursor = "not-allowed";
	submit_clickable = false;
	thanks_text.innerHTML = "Thank you for your feedback!";
	makeThanksText();
}

// Timeout variables
var five_sec, four_sec, three_sec, two_sec, one_sec, final_time;

// Timeout for idle feedback screen
function feedback_timeout() {
	let countdown = document.getElementById("countdown");
	if (five_sec != null || final_time != null) {
		clearTimeout(five_sec);
		clearTimeout(four_sec);
		clearTimeout(three_sec);
		clearTimeout(two_sec);
		clearTimeout(one_sec);
		clearTimeout(final_time);
		countdown.innerHTML = "";
	}
	five_sec = setTimeout(function(){countdown.innerHTML = "Timeout in 5 seconds"}, 295000);
	four_sec = setTimeout(function(){countdown.innerHTML = "Timeout in 4 seconds"}, 296000);
	three_sec = setTimeout(function(){countdown.innerHTML = "Timeout in 3 seconds"}, 297000);
	two_sec = setTimeout(function(){countdown.innerHTML = "Timeout in 2 seconds"}, 298000);
	one_sec = setTimeout(function(){countdown.innerHTML = "Timeout in 1 second"}, 299000);
	final_time = setTimeout(function(){location.reload(true)}, 300000);
}

// Timeout for idle after-submission screen
function submit_timeout() {
	let countdown = document.getElementById("countdown");
	setTimeout(function(){countdown.innerHTML = "Timeout in 5 seconds"}, 25000);
	setTimeout(function(){countdown.innerHTML = "Timeout in 4 seconds"}, 26000);
	setTimeout(function(){countdown.innerHTML = "Timeout in 3 seconds"}, 27000);
	setTimeout(function(){countdown.innerHTML = "Timeout in 2 seconds"}, 28000);
	setTimeout(function(){countdown.innerHTML = "Timeout in 1 second"}, 29000);
	setTimeout(function(){location.reload(true)}, 30000);
}


// Clicking submit button
function submit() {
	submit_timeout();
	if (submit_clickable) {
		json.feedback = feedback.value;
		makeModalSmaller();
		thankYou();
		//the line below will be replaced with the ajax call
		console.log(json);
		modal_body.style.height = "25vh";
		fadeSubmit();
	}
}

// Move "Thank You" text
function makeThanksText() {
	thanks_text.style.animationDuration = "1s";
	thanks_text.style.animationName = "center_text";
}