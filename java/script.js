var questions = [
    {
        title: "Which one of these do commonly used data types DONT FIT in this group?",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "What can be stored using an ARRAY in Javascript?",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "What must string values be enclosed within when being assigned to variables?",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "What tool would we use during development and debugging for printing content to the debugger?",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

var timerEl = document.querySelector(".timer");
var questionsEl = document.querySelector(".questions");
var answersEl = document.querySelector(".answers");
var clickStartEl = document.querySelector(".clickToStart");
var container = document.querySelector(".container");
var multChoiceEl = document.querySelector(".multChoiceUl");
var scoreEl = document.querySelector(".score");


var score = 0;
var questionsAskedIndex = 0;
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var createAnsList = document.createElement("ul");
//  set variables for needed information
// starting the quiz with a click
clickStartEl.addEventListener("click", function () {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            timerEl.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                finished();
                timerEl.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionsAskedIndex);
});

// function to loop through the questions array 
function render(questionsAskedIndex) {

    // clears existing data 
    questionsEl.innerHTML = "";
    createAnsList.innerHTML = "";

    //    loop for array
    for (var i = 0; i < questions.length; i++) {

        var userQuestion = questions[questionsAskedIndex].title;
        var userChoices = questions[questionsAskedIndex].choices;
        questionsEl.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("button");
        listItem.textContent = newItem;
        questionsEl.appendChild(createAnsList);
        createAnsList.appendChild(listItem);
        listItem.addEventListener("click", (compare));
        // attempting to add over the bootstrap layout into list form but I cannot 
        listItem.setAttribute("class", "btn-primary", "list-group-item");
    })
}

// function event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("button")) {

        var createDiv = document.createElement("div");
        // createDiv.setAttribute("class", "btn-primary");
        createDiv.setAttribute("id", "createDiv");

        // correct condition 
        if (element.textContent == questions[questionsAskedIndex].answer) {
            score = score + 20;
            scoreEl.textContent = "Score " + score;
            // alert("Correct!");
            createDiv.textContent = "Correct!";
            // incorrect condition 
        } else {
            // wrong answer penalty 
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong!";
        }

    }
    // index determines number question user is on
    questionsAskedIndex++;

    if (questionsAskedIndex >= questions.length) {

        finished();
        createDiv.textContent = "End of Quiz!";
    } else {
        render(questionsAskedIndex);
    }
    questionsEl.appendChild(createDiv);

}

// creating the submit page layout 
function finished() {
    questionsEl.innerHTML = "";
    timerEl.innerHTML = "";
    // heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Clickers Down!"
    questionsEl.appendChild(createH1);
    // paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsEl.appendChild(createP);
    // final score presented  
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + score;
    questionsEl.appendChild(createP2);

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials ";
    createLabel.textContent = "Enter your initials: ";

    questionsEl.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    questionsEl.appendChild(createInput);
    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.setAttribute("class", "btn-primary");
    createSubmit.textContent = "Submit";

    questionsEl.appendChild(createSubmit);

    var createGoBack = document.createElement("button");
    createGoBack.setAttribute("type", "history");
    createGoBack.setAttribute("id", "GoBack");
    createGoBack.setAttribute("class", "btn-primary");
    createGoBack.textContent = "Go Back";
    questionsEl.appendChild(createGoBack);


    createGoBack.addEventListener("click", function () {
        document.location.href = "./index.html";
    })
    // Test
    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            console.log("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: score
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            // takes you to the high score page 
            window.location.replace("./HighScore/HighScore.html");
        }
    });
}