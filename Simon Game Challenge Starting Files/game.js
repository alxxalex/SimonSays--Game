var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 1;
var index = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];

  $("#" + randomChosenColor).fadeOut(80).fadeIn(80);

  playSound(randomChosenColor);

  gamePattern.push(randomChosenColor);

  $("h1").text("Level " + level);
  level++;

  index = 0;
}

//---Events---
$(".btn").on("click", function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  if (gamePattern[index] === userClickedPattern[index]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
    $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart!");
    startOver();
  }

  index++;
});


$(document).on("keydown", function(event) {
  if (start === false) {
    start = true;
    nextSequence();
  }
});

//----*****-----
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 1;
  gamePattern = [];
  start = false;
  userClickedPattern = [];
}
