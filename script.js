//Game state
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = 0;
let now = new Date();
let start = now;
let intervalId;
let difference;
//Finding name
let playerName = prompt("Hello! What is your name?");

//timer
function updateTimer() {
    let now = new Date().getTime();
    let elapsed = (now - start) / 1000;  // convert ms to seconds
    document.getElementById("avgTime").textContent = elapsed.toFixed(2);
}


//Play button
document.getElementById("playBtn").addEventListener("click", function(){
    intervalId = setInterval(updateTimer, 10);
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
    let radio = document.getElementsByName("level");
    let range = 3;
    for (let i = 0; i < radio.length; i++){
        if (radio[i].checked){
            range = parseInt(radio[i].value);
        }
    }

    //pick answer
    answer = Math.floor(Math.random() * range) + 1;

    //Disable & enable buttons/radios
    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
    document.getElementById("guess").value="";
    document.getElementById("guessBtn".disabled) = false;
    document.getElementById("playBtn".disabled) = true;
    document.getElementById("giveUpBtn").disabled = false;

    for (let i = 0; i <radio.length; i++){
        radio[i].disabled = true;
    }

});

//Guess button
document.getElementById("guessBtn").addEventListener("click", function(){
    let guess = document.getElementById("guess").value;
    if (guess == answer){
        document.getElementById("msg").textContent = "Congratulations " + playerName + "! You guessed the correct number in " + (guessCount + 1) + " guesses!";
        updateScore(guessCount);
        document.getElementById("guessBtn").disabled = true;
        document.getElementById("playBtn").disabled = false;
        document.getElementById("giveUpBtn").disabled = true;

        let radio = document.getElementsByName("level");
        for (let i = 0; i < radio.length; i++){
            radio[i].disabled = false;
        }
        clearInterval(intervalId);
    }
    else if (guess > answer ){
        guessCount++;
        document.getElementById("giveUpBtn").disabled = false;
        difference = guess - answer;
        document.getElementById("msg").textContent = playerName + ", The answer is lower, but ";
        if (difference <= 2){
            document.getElementById("msg").textContent += "You are very hot!";
        }
        else if (difference <= 5){
            document.getElementById("msg").textContent += "You are warm!";
        }
        else if (difference > 5){
            document.getElementById("msg").textContent += "You are cold!";
        }
    }
    else if (guess < answer ){   
        document.getElementById("msg").textContent = playerName + ", The answer is lower, but ";
        guessCount++;
        document.getElementById("giveUpBtn").disabled = false;
        if (difference <= 2){
            document.getElementById("msg").textContent += playerName + "You are very hot!";
        }
        else if (difference <= 5){
            document.getElementById("msg").textContent += playerName + "You are warm!";
        }
        else if (difference > 5){
            document.getElementById("msg").textContent += playerName + "You are cold!";
        }
    }
    else {
        document.getElementById("msg").textContent = "Invalid input, please enter a valid number.";
        document.getElementById("giveUpBtn").disabled = false;
    }
});

//Give up button
document.getElementById("giveUpBtn").addEventListener("click", function(){
    document.getElementById("msg").textContent = "The correct answer was " + answer + ". Better luck next time, " + playerName + "!";
    totalGuesses += guessCount;
    clearInterval(intervalId);
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = true;

    let radio = document.getElementsByName("level");
    for (let i = 0; i < radio.length; i++){
        radio[i].disabled = false;
    }
});

//stats

function updateScore(score){
    totalWins++;
    totalGuesses += score;

    document.getElementById("wins").textContent = "Total Wins: " + totalWins;
    document.getElementById("avgScore").textContent = "Average Score: " + (totalGuesses / totalWins || 0).toFixed(2);
}

//leaderboard
scores.push(scores);
scores.sort(function(a, b){return a - b});

let leaderboard = document.getElementsByName("leaderboard");
for (let i = 0; i < leaderboard.length; i++){
    if (i < scores.length){
        leaderboard[i].textContent = scores[i];
    }
    else{
        leaderboard[i].textContent = "_";
    }
    document.getElementById("leader1").textContent = "1. " + (scores[0] || "100");
    document.getElementById("leader2").textContent = "2. " + (scores[1] || "100");
    document.getElementById("leader3").textContent = "3. " + (scores[2] || "100");   
}
   