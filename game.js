
var buttonColours = [ "red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false ;

var level = 0

$("html").keydown(function(event){
  if(!started){
    nextSequence();
    $("#level-title").text("Level "+level);
    started = true;
}
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  var kitten = "#"+ userChosenColour;
  playSound(userChosenColour);
  animatePress(kitten);
  checkAnswer(userClickedPattern.length-1);
});

function  checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length){

          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);

        }

      } else {
        $("body").addClass("game-over");
        console.log("wrong");
        playSound("wrong");
        setTimeout(function(){$("body").removeClass("game-over");},200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
      }
  }

function startOver(){
  level=0;
  gamePattern=[];
  started =false;
}

function nextSequence(){
  userClickedPattern =[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  var cat="#"+randomChosenColour;
  gamePattern.push(randomChosenColour);
  animatePress(cat);
  $("cat").fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level "+level);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $(currentColour).addClass("pressed");
  setTimeout(function(){$(currentColour).removeClass("pressed"); }, 100);
}
