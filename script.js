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
        document.getElementById("msg").textContent = "Congratulations " + playerName + "! You guessed the correct number in " + guessCount + " guesses!";
        updateScore(guessCount);
        document.getElementById("guessBtn").disabled = true;
        document.getElementById("playBtn").disabled = false;
        document.getElementById("giveUpBtn").disabled = true;

        let radio = document.getElementsByName("level");
        for (let i = 0; i < radio.length; i++){
            radio[i].disabled = false;
        }
    }
    else if (guess > answer){
        document.getElementById("msg").textContent = "Close " + playerName + "! The answer is lower. Try again!";
        guessCount++;
        document.getElementById("giveUpBtn").disabled = false;
    }
    else if (guess < answer){
        document.getElementById("msg").textContent = "Close " + playerName + "! The answer is higher. Try again!";   
        guessCount++;
        document.getElementById("giveUpBtn").disabled = false;
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
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = true;

    let radio = document.getElementsByName("level");
    for (let i = 0; i < radio.length; i++){
        radio[i].disabled = false;
    }
})

//stats

function updateScore(score){
    totalWins++;
    totalGuesses += score;

    document.getElementById("wins").textContent = "Total Wins: " + totalWins;
    document.getElementById("avgScore").textContent = "Average Score: " + (totalGuesses / totalWins || 0).toFixed(2);
}

//timer
