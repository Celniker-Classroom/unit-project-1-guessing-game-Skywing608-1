//Game state
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = 0;
//Finding name
let playerName = prompt("Hello! What is your name?");

//Play button
document.getElementById("playBtn").addEventListener("click", function(){
    document.getElementById("guessBtn").disabled = false;
    //document.getElementById("playBtn").disabled = true;
    let radio = document.getElementsByName("level");
    let range = 3;
    for (let i = 0; i < radio.length; i++){
        if (radio[i].checked){
            range = parseInt(radio[i].value);
        }
    }
    
    //round setup
    answer = Math.floor(Math.random() * range) + 1;

    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
    document.getElementById("guess").value="";
    document.getElementById("guessBtn".disabled) = false;
    document.getElementById("playBtn".disabled) = true;
    document.getElementById("giveUpBtn").disabled = false;

    for (let i = 0; i <radioadio.length; i++){
        radio[i].disabled = true;
    }

});

//Guess button



