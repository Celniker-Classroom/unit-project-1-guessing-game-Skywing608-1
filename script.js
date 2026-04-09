// Game state variables
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGames = 0;
let totalGuesses = 0;
let totalTime = 0;
let scores = [];
let fastestTime = Infinity;
let startTime = 0;
let timeIntervalId;


// Get player name and case it correctly
let playerName = prompt("Hello! What is your name?");
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();


// Function to format time with month name, day suffix, and seconds
function time() {
   const now = new Date();
   const monthNames = [
       "January", "February", "March", "April", "May", "June",
       "July", "August", "September", "October", "November", "December"
   ];
   const day = now.getDate();
   let suffix = "th";
   if (day >= 11 && day <= 13) {
       suffix = "th";
   } else {
       switch (day % 10) {
           case 1: suffix = "st"; break;
           case 2: suffix = "nd"; break;
           case 3: suffix = "rd"; break;
       }
   }
   const year = now.getFullYear();
   const hours = now.getHours().toString().padStart(2, '0');
   const minutes = now.getMinutes().toString().padStart(2, '0');
   const seconds = now.getSeconds().toString().padStart(2, '0');
   return `${monthNames[now.getMonth()]} ${day}${suffix}, ${year} ${hours}:${minutes}:${seconds}`;
}


// Function to start a new game
function play() {
   // Get selected level
   let range = 3;
   const radios = document.getElementsByName("level");
   for (let i = 0; i < radios.length; i++) {
       if (radios[i].checked) {
           range = parseInt(radios[i].value);
           break;
       }
   }


   // Generate random answer
   answer = Math.floor(Math.random() * range) + 1;


   // Reset guess count
   guessCount = 0;


   // Record start time
   startTime = new Date().getTime();


   // Update message
   document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;


   // Clear guess input
   document.getElementById("guess").value = "";


   // Enable/disable buttons
   document.getElementById("guessBtn").disabled = false;
   document.getElementById("giveUpBtn").disabled = false;
   document.getElementById("playBtn").disabled = true;


   // Disable level radios
   for (let i = 0; i < radios.length; i++) {
       radios[i].disabled = true;
   }
}


// Function to handle a guess
function makeGuess() {
   const guessInput = document.getElementById("guess");
   const guess = parseInt(guessInput.value);


   if (isNaN(guess)) {
       document.getElementById("msg").textContent = "Please enter a valid number.";
       return;
   }

   guessCount++;


   if (guess === answer) {
       // Correct guess
       const endTime = new Date().getTime();
       const elapsedTime = (endTime - startTime) / 1000;
       document.getElementById("msg").textContent = "Congratulations " + playerName + "! You guessed the correct number in " + guessCount + " guesses!";
       updateScore(guessCount);
       updateTimers(elapsedTime);
       reset();
   } else {
       // Wrong guess - provide feedback
       let feedback = "";
       if (guess > answer) {
           feedback = "The answer is lower";
       } else {
           feedback = "The answer is higher";
       }


       // Add hot/warm/cold
       const difference = Math.abs(guess - answer);
       if (difference <= 2) {
           feedback += ", but you are very hot!";
       } else if (difference <= 5) {
           feedback += ", but you are warm!";
       } else {
           feedback += ", but you are cold!";
       }


       document.getElementById("msg").textContent = playerName + ", " + feedback;
   }
}

// Function to update score after win or give up
function updateScore(score) {
   totalWins++;
   totalGames++;
   totalGuesses += score;
   scores.push(score);
   scores.sort((a, b) => a - b); // Sort ascending (lower = better)

   // Update displays
   document.getElementById("wins").textContent = "Total wins: " + totalWins;
   document.getElementById("avgScore").textContent = "Average Score: " + (totalGuesses / totalGames).toFixed(2);

   // Update leaderboard
   updateLeaderboard();
}

// Function to update timer stats
function updateTimers(elapsedTime) {
   totalTime += elapsedTime;


   if (elapsedTime < fastestTime) {
       fastestTime = elapsedTime;
       document.getElementById("fastest").textContent = "Fastest Game: " + fastestTime.toFixed(2) + " seconds";
   }

   document.getElementById("avgTime").textContent = "Average Time: " + (totalTime / totalGames).toFixed(2) + " seconds";
}

// Function to reset for next round
function reset() {
   // Enable level radios
   const radios = document.getElementsByName("level");
   for (let i = 0; i < radios.length; i++) {
       radios[i].disabled = false;
   }

   // Enable/disable buttons
   document.getElementById("playBtn").disabled = false;
   document.getElementById("guessBtn").disabled = true;
   document.getElementById("giveUpBtn").disabled = true;
}

// Function to handle give up
function giveUp() {
   // Get current range
   let range = 3;
   const radios = document.getElementsByName("level");
   for (let i = 0; i < radios.length; i++) {
       if (radios[i].checked) {
           range = parseInt(radios[i].value);
           break;
       }
   }

   const endTime = new Date().getTime();
   const elapsedTime = (endTime - startTime) / 1000;

   document.getElementById("msg").textContent = "The correct answer was " + answer + ". Better luck next time, " + playerName + "! Your score is " + range + ".";
   updateScore(range);
   updateTimers(elapsedTime);
   reset();
}

// Function to update leaderboard display
function updateLeaderboard() {
   const leaderboardItems = document.getElementsByName("leaderboard");
   for (let i = 0; i < leaderboardItems.length; i++) {
       if (i < scores.length) {
           leaderboardItems[i].textContent = scores[i];
       } else {
           leaderboardItems[i].textContent = "--";
       }
   }
}

// Initialize the game
document.getElementById("date").textContent = time();
timeIntervalId = setInterval(() => {
   document.getElementById("date").textContent = time();
}, 1000);

// Wire event listeners
document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

// Theme toggle
document.getElementById("theme-switch").addEventListener("change", function() {
   document.body.classList.toggle("dark-mode");
});

// Initialize displays
document.getElementById("fastest").textContent = "Fastest Game: N/A";
document.getElementById("avgTime").textContent = "Average Time: N/A";
updateLeaderboard();