var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var acceptingInput = false;

// START DETECTION****
function detectionClickedStart() {
  $(".start-game-btn").click(function () {
    $(".start-game-btn").addClass("pressed");
    $(".start-game-btn").hide();
    acceptingInput = false;
    setTimeout(function () {
      $(".start-game-btn").removeClass("pressed");
      started = true;
      checkAnimation();
      nextSequence();
    }, 200);
  });
}

// CREATE GAME LEVEL
function nextSequence() {
  level++;

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#level-title").text("LEVEL" + " " + level);

  $("#" + randomChosenColour)
    .fadeOut(150)
    .fadeIn(150);
  playSound(randomChosenColour);

  acceptingInput = true;
}

// PLAY SOUND BUTTON*****
function playSound(name) {
  var sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

$(".btn").click(function () {
  if (!acceptingInput) {
    return;
  }
  if (!started) {
    return;
  }
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// ANIMATION FUNC*****
function animatePress(currentColour) {
  let addClassPressed = $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    addClassPressed.removeClass("pressed");
  }, 200);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      acceptingInput = false;
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function checkAnimation() {
  if (started) {
    $("#level-title").removeClass("blink");
  } else {
    $("#level-title").addClass("blink");
  }
}

function gameOver() {
  started = false;
  checkAnimation();
  acceptingInput = false;
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("GAME OVER, PRESS START TO RESTART");

  gamePattern = [];
  userClickedPattern = [];
  level = 0;

  $(".start-game-btn").show();
}

detectionClickedStart();
