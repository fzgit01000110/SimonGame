// Variables
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 1;
let isStarted = false;

//Event Listener
$(document).click(function () {
    if (isStarted === false) {
        nextSequence();
        isStarted = true;
    }
})




$(".btn").click(function () {
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

// Functions
function nextSequence() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").text("Level - " + level);
    level++;
}

function playSound(buttonColor) {
    switch (buttonColor) {
        case "green":
            var audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "red":
            var audio = new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "yellow":
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        case "blue":
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;

        default:
            console.log(buttonColor);
            break;
    }
}


function animatePress(currentColour) {
    $("#" + currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        let isEqual = JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern);
        if (isEqual) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1000)
        startOver();
    }
}


function startOver() {
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
    isStarted = false;
}
