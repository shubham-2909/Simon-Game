var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var level = 0;
var started = false;
var userClickedPattern = [];
$(document).keypress(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
})


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    addAnimation(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            console.log("success");

            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game over! Press any key to start again");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}
function nextSequence() {
    userClickedPattern=[];
    level += 1;
    $("#level-title").text("Level " + level)
    var randomChosenNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomChosenNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function addAnimation(color) {
    $("#" + color).addClass("pressed");

    setTimeout(() => {
        $("#" + color).removeClass("pressed");
    }, 100);

}
function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}
