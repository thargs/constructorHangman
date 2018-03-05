$(document).ready(function() {

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Lets get rolling... (click to begin)</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

$("body").on("click", ".start-button", function(event){
	event.preventDefault(); 
	generateHTML();
	timer();

}); 

//////////////////////////////////////////////////////////////////////////

$("body").on("click", ".answer", function(event){
	
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		clearInterval(theClock);
		win();
	}
	else {
		clearInterval(theClock);
		loss();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); 

});

////////////////////////////////////////////////////////////////////////

function lossTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='../assets/images/crash.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000); 
}

function win() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000);  
}

function loss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='../assets/images/crash.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 3000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timer();
	}
	else {
		finalScreen();
	}
}

function timer() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			lossTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Finish Line!, here is how you ranked!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Lets do it again!</a></p>";
	$(".mainArea").html(gameHTML);
}



///////////////////////////////////////////////////////////////////////////////////

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timer();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = [
	"Where were bicycles first invented?", 
	"What is the core of a bicycle called?", 
	"What does the front fork hold?", 
	"What do bicycles use to reduce friction?", 
	"Which bicycle part doesn't have ball bearings?", 
	"What is the name of early bicycles with a huge front wheel?", 
	"What dose the stem hold?", 
	"What is one of the reasons bicycles are now made with gears?"
];
var answerArray = [
	["Europe", "Africa", "North America", "Asia"], 
	["Seat Post","Frame","Wheels","Handlebar"], 
	["The Chain", "The Gears", "The Front Wheel", "Dinner"], 
	["Aerodynamics","Oil","Ball Bearings","Air"], 
	["Front Hub", "Headset", "Rear Hub", "Gear Shift"], 
	["Penny-Farthing Bicycles","Unicycles","Parading Bicycles","Oxnard Bicycles"], 
	["Front Wheel", "Handlebars", "Crank", "Saddle"], 
	["Reduce weight","More attractive","For a smoother ride","To reduce the size of the wheels"]
];
var imageArray = [
	"<img class='center-block img-right' src='../assets/images/europe.png'>", 
	"<img class='center-block img-right' src='../assets/images/frame.png'>", 
	"<img class='center-block img-right' src='../assets/images/frontWheel.jpg'>", 
	"<img class='center-block img-right' src='../assets/images/bearing.jpg'>", 
	"<img class='center-block img-right' src='../assets/images/gearShift.jpg'>", 
	"<img class='center-block img-right' src='../assets/images/pennyFarthing.png'>", 
	"<img class='center-block img-right' src='../assets/images/bars.jpg'>", 
	"<img class='center-block img-right' src='../assets/images/bikeSize.png'>"
];
var correctAnswers = [
	"A. Europe", 
	"B. Frame", 
	"C. The Front Wheel", 
	"C. Ball Bearings", 
	"D. Gear Shift", 
	"A. Penny-Farthing Bicycles", 
	"B. Handlebars", 
	"D. To reduce the size of the wheels"
];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;