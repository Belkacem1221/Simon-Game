var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
   if (!started) {
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
   }
    
})



function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
    userClickedPattern.length = 0;
    
    level++;
    $("h1").text("Level "+level);
}

function playSound(name) {
    var playAudio = new Audio("sounds/"+name+".mp3");
    playAudio.play();
    
}

function animatePress(currentColour) {
    var btnAddClass = $("."+currentColour).addClass("pressed");

    setTimeout(function(){
        btnAddClass.removeClass("pressed");
    },100);
};

function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
   }else{
        gameOver();
        startOver();
   }
}


function gameOver() {
    var gameOverAudio = new Audio("sounds/wrong.mp3");
    gameOverAudio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    
    var gameOverAddClass = $("body").addClass("game-over");

    setTimeout(function(){
    gameOverAddClass.removeClass("game-over");
    },200);
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    started = false;
}