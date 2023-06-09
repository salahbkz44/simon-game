var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    animatePress(userChosenColour);
    playSound(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
  });


function nextSequence() {

    userClickedPattern=[];

    level++;
  
    $("h1").text("Level " + level);
  
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

$(document).keydown(function() {
    if(started!=true){
        nextSequence();
    }
    started=true;
  });

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
} 

function startOver(){
    gamePattern = [];

    userClickedPattern = [];
    
    started = false;
    
    level = 0;

}
