//Game state
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGames = 0;
let totalGuesses = 0;
let totalTime = 0;
let scores = [];
let fastestTime = Infinity;
let start = 0;
let intervalId;
let difference;
let timer = 0;
//Finding name
let playerName = prompt("Hello! What is your name?");


function getDaySuffix(day) {
   if (day >= 11 && day <= 13) {
       return "th";
   }
   switch (day % 10) {
       case 1:
           return "st";
       case 2:
           return "nd";
       case 3:
           return "rd";
       default:
           return "th";
   }
}


function displayCurrentDate() {
   const now = new Date();
   const monthNames = [
       "January", "February", "March", "April", "May", "June",
       "July", "August", "September", "October", "November", "December"
   ];
   const day = now.getDate();
   const suffix = getDaySuffix(day);
   const year = now.getFullYear();
   document.getElementById("date").textContent = `${monthNames[now.getMonth()]} ${day}${suffix}, ${year}`;
}


// Initialize displays
displayCurrentDate();
document.getElementById("fastest").textContent = "Fastest Game: N/A";
document.getElementById("avgTime").textContent = "Average Time: N/A";
updateLeaderboard();


//timer
function updateTimer() {
   let now = new Date().getTime();
   let elapsed = (now - start) / 1000;  // convert ms to seconds
   timer = elapsed.toFixed(2);
}


//Play button
document.getElementById("playBtn").addEventListener("click", function(){
   clearInterval(intervalId);
   start = Date.now();
   timer = 0;
   updateTimer();
   intervalId = setInterval(updateTimer, 10);
   document.getElementById("guessBtn").disabled = false;
   document.getElementById("playBtn").disabled = true;
   guessCount = 0;
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
   document.getElementById("guessBtn").disabled = false;
   document.getElementById("playBtn").disabled = true;
   document.getElementById("giveUpBtn").disabled = false;


   for (let i = 0; i <radio.length; i++){
       radio[i].disabled = true;
   }


});


//Guess button
document.getElementById("guessBtn").addEventListener("click", function(){
   let guess = document.getElementById("guess").value;
   if (guess == answer){
       clearInterval(intervalId);
       const elapsedTime = (Date.now() - start) / 1000;
       document.getElementById("msg").textContent = "Congratulations " + playerName + "! You guessed the correct number in " + (guessCount + 1) + " guesses and " + elapsedTime.toFixed(2) + " seconds!";
       updateScore(guessCount + 1, elapsedTime);
       document.getElementById("guessBtn").disabled = true;
       document.getElementById("playBtn").disabled = false;
       document.getElementById("giveUpBtn").disabled = true;


       let radio = document.getElementsByName("level");
       for (let i = 0; i < radio.length; i++){
           radio[i].disabled = false;
       }
   }
   else if (guess > answer ){
       guessCount++;
       document.getElementById("giveUpBtn").disabled = false;
       difference = Math.abs(guess - answer);
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
       document.getElementById("msg").textContent = playerName + ", The answer is higher, but ";
       guessCount++;
       document.getElementById("giveUpBtn").disabled = false;
       difference = answer - guess;
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
   else {
       document.getElementById("msg").textContent = "Invalid input, please enter a valid number.";
       document.getElementById("giveUpBtn").disabled = false;
   }
});


//Give up button
document.getElementById("giveUpBtn").addEventListener("click", function(){
   let radio = document.getElementsByName("level");
   let range = 3;
   for (let i = 0; i < radio.length; i++){
       if (radio[i].checked){
           range = parseInt(radio[i].value);
       }
   }
   let score = range;
   document.getElementById("msg").textContent = "The correct answer was " + answer + ". Better luck next time, " + playerName + "! Your score is " + score + ".";
   recordGiveUpScore(score);
   clearInterval(intervalId);
   document.getElementById("guessBtn").disabled = true;
   document.getElementById("playBtn").disabled = false;
   document.getElementById("giveUpBtn").disabled = true;


   for (let i = 0; i < radio.length; i++){
       radio[i].disabled = false;
   }
});


//stats
function updateScore(score, elapsedTime){
   totalWins++;
   totalGames++;
   totalGuesses += score;
   totalTime += elapsedTime;
   if (elapsedTime < fastestTime) {
       fastestTime = elapsedTime;
       document.getElementById("fastest").textContent = "Fastest Game: " + fastestTime.toFixed(2) + " seconds";
   }
   document.getElementById("avgTime").textContent = "Average Time: " + (totalTime / totalWins).toFixed(2) + " seconds";
   scores.push({name: playerName, guesses: score});
   scores.sort((a, b) => a.guesses - b.guesses);
   updateLeaderboard();
   document.getElementById("wins").textContent = "Total Wins: " + totalWins;
   document.getElementById("avgScore").textContent = "Average Score: " + (totalGuesses / totalGames || 0).toFixed(2);
}


function recordGiveUpScore(score) {
   totalGames++;
   totalGuesses += score;
   scores.push({name: playerName, guesses: score});
   scores.sort((a, b) => a.guesses - b.guesses);
   updateLeaderboard();
   document.getElementById("avgScore").textContent = "Average Score: " + (totalGuesses / totalGames || 0).toFixed(2);
}


//leaderboard
function updateLeaderboard() {
   document.getElementById("leader1").textContent = scores[0] ? `1. ${scores[0].name} - ${scores[0].guesses} guesses` : "1. _";
   document.getElementById("leader2").textContent = scores[1] ? `2. ${scores[1].name} - ${scores[1].guesses} guesses` : "2. _";
   document.getElementById("leader3").textContent = scores[2] ? `3. ${scores[2].name} - ${scores[2].guesses} guesses` : "3. _";
}
 

