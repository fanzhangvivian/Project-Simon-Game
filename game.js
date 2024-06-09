// alert("hi")
const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
var level = 0

/* this control the keypress function */
var keyPressed = false;
$(document).keypress(function() {
    // for each new keypress, the keyPressed is False
    if (!keyPressed) {
    setTimeout(nextSequence, 100);
    keyPressed = true;
    }
});


/* this control the user's click process */
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer()
})

/* this handle the automatic random button process */
function nextSequence() {
    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;
    // Inside nextSequence(), update the h1 with this change in the value of level.
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    // handle the flash function of each button
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // make sound of eachbutton when it is selected;
    makeSound(randomChosenColor);
    console.log(gamePattern);

}

/* this handle the sound of each button */
function makeSound(key) {
    var audio = new Audio('sounds/'+key+'.mp3');
    audio.play();
}

/* this handle the button to be shadowed and background changed into grey when user chose */
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    // check the current user answer is the same as the game pattern
    if (userClickedPattern[userClickedPattern.length-1] == gamePattern[userClickedPattern.length-1]) {
        // check the user has already finish all the game pattern
        if (userClickedPattern.length === gamePattern.length) {
            console.log("success");
            // how to make setimeout of function
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }   
    }    
    else {
        console.log("wrong");
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        starOver() 
    }
}

function starOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = []; 
    keyPressed = false; 
}

