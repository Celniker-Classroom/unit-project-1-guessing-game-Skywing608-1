//Finding name
var name = prompt("Hello! What is your name?");

//difficulty selection
var easy = document.querySelector('input[id="e"]:checked').value;
var medium = document.querySelector('input[id="m"]:checked').value;
var hard = document.querySelector('input[id="h"]:checked').value;

//Play button
function play(){
    document.getElementById("guessBtn").disabled = false;
    if (easy = true){
        var randomNum = Math.floor(Math.random() * easy) + 1;
        alert(randomNum);
    }
    
    if (medium = true){
        var randomNum = Math.floor(Math.random() * medium) + 1;
        alert(randomNum);
    }
    
    if (hard = true){
        var randomNum = Math.floor(Math.random() * hard) + 1;
        alert(randomNum);
    }

}

document.getElementById("playBtn").addEventListener("click", play);