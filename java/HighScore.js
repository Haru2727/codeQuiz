var highScore = document.querySelector(".highScore");
var clearHighScore = document.querySelector(".clear-score");
var goBackButton = document.querySelector(".go-back");

// event listener to clear high score
clearHighScore.addEventListener("click", function () {
   if (clearHighScore){
    localStorage.clear();
    location.reload();
   }
});

// Retreives local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

// Event listener to move to index page
goBackButton.addEventListener("click", function () {
    window.location.replace("../index.html");
});