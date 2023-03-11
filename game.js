// alert("Hello")


/* 

if you get this as output in the chrome developer tools then your jquery is linked 
$("h1")
E.fn.init [h1#level-title, prevObject: E.fn.init(1)]

*/

let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []

let userClickedPattern = [];


let started = false

let level = 0;
$(document).keypress(()=>{
    if (!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started  = true
    }
})

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)

    // console.log(userClickedPattern)
    playSound(userChosenColour)
    animatePress(userChosenColour)

    $("h1").html(`Level ${level}`)

    checkAnswer(userClickedPattern.length - 1 )
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("succcess")

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();

            }, 1000)
        }
    }else {
        console.log("Wrong")

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)


        $("#level-title").text("Game over, press any key to start!")

        startOver()
    }

}

function nextSequence() {
    userClickedPattern = []

    level ++

    $("#level-title").text("Level " + level)

    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)


    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)

    playSound(randomChosenColour)
    animatePress(randomChosenColour)
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3")
    audio.play();

}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed")
    setTimeout(()=>{
        $("." + currentColour).removeClass("pressed")

    }, 100)
}


function startOver(){

    level = 0
    gamePattern = []
    started = false
}