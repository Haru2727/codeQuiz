var timerEl = document.querySelector("#timer");
var questionsEl = document.querySelector("#questions");
var answersEl = document.querySelector("#answers");
var clickStartEl = document.querySelector("#clickToStart");
var container = document.querySelector(".container");
// questions array
var questionsAsked = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

// quiz variables

var score = 0;
var questionsAskedIndex = 0;
var secondsLeft = 75;
var holdInterval = 0;
var penalty = 10;
var createAnsList = document.createElement("ul");

// clickStartEl.addEventListener("click", function () {
//     if (holdInterval === 0) {
//         holdInterval = setInterval(function () {
//             secondsLeft--;
//             timerEl.textContent = "Time: " + secondsLeft;
//         })
//     }
// })

clickStartEl.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            timerEl.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                timerEl.textContent = "Time's up!";
            }
        }, 1000);
    }
    return(questionsAskedIndex);
});
