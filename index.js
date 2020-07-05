
let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "green", "blue", "yellow"];
let level = 0;
let started = false; //allows game to start when key is pressed

//starts game when any key is pressed
$(document).keypress(function(){
	if (!started) {

	nextSequence();
	$("h1").text("Level " + level);
	started = true;
	}
});

//animates button when user presses it, adds clicked button to userClickedPattern array, and checks if user pattern matches random pattern
$(".btn").click(function(){

	let userChosenColour = event.currentTarget.id;
	userClickedPattern.push(userChosenColour);

	animatePress(userChosenColour);
	playSound(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);

});


//what happens each turn
let nextSequence = () => {

	//resets user pattern
	userClickedPattern = [];

	//increments level and changes text at top to reflect that
	level++;
	$("h1").text("Level " + level);

	//creates and selects a random colour
	let randomChosenColor = buttonColours[Math.floor(Math.random() * 4)];
		gamePattern.push(randomChosenColor);

	//plays entire pattern including new colour
	runLoop();
}


//plays entire pattern 
let runLoop = async() => {

	//cycles through game pattern array, waiting 500ms before highlighting each colour
	for (const item of gamePattern) {
		await new Promise( resolve => setTimeout( resolve, 500));
		$("#" + item).fadeIn(100).fadeOut(100).fadeIn(100);
		playSound(item);

		}

}


//plays sound according to id of chosen colour
let playSound  = (name) => {

	let audio = new Audio("sounds/" + name + ".mp3");
	audio.play();

}

//makes animation occur on pressed item according to id of clicked colour
let animatePress = (currentColour) => {

	$("#" + currentColour).addClass("pressed");

	setTimeout(function(){
  	$("#" + currentColour).removeClass("pressed")
	}, 100);
}


let checkAnswer = (currentLevel) => {

	//check if user clicked button matches the randomly selected button from the current turn
	if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

	//if the colours match, continue selecting new random colour and 
	//checking user clicked colour against current turn colour until the user has finished putting in the pattern 
	if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

    }

    //if user clicks wrong colour, this will execute instead of game selecting a new colour
    } else {

      endGame();

    }

}


let endGame = () => {

	//plays wrong sound
	let audio = new Audio("sounds/wrong.mp3");
	audio.play();

	//resets level to 0, changes text to game over
	level = 0;
	$("h1").text("GAME OVER, PRESS ANY KEY TO RESTART");

	//animates background with red flash
	$("body").addClass("game-over");
	setTimeout(function(){
  	$("body").removeClass("game-over")
	}, 200);

	//resets user pattern and game pattern. changes started to false again so key press will re-initiate new game
	userClickedPattern = [];
	gamePattern = [];
	started = false;

}



