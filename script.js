//Questions
var questionArr = [
    {
    question: "The condition in an if / else statement is enclosed within ____.",
    choiceA : "quotes",
    choiceB : "curly brackets",
    choiceC : "parentheses",
    correct : "A"
    },  
    {
    question: "What does CSS stand for?",
    choiceA : "California Style Sheet",
    choiceB : "Cryptic Standing Sheet",
    choiceC : "Cascading Style Sheet",
    correct : "C"
    }, 
    {
    question: "What event occurs when a user clicks on an HTML element?",
    choiceA : "onclick",
    choiceB : "ondown",
    choiceC : "onmouse",
    correct : "A"
    },
    {
    question: "How do you write 'Hello' in an alert?",
    choiceA : "alertBox('Hello')",
    choiceB : "alert('Hello')",
    choiceC : "msg('Hello')",
    correct : "B"
    }, 
    {
    question: "Javascript is the same as Java?",
    choiceA : "true",
    choiceB : "false",
    choiceC : "I don't know",
    correct : "B"
    }
];
//Variables
var i = 0;
var startButton = document.getElementById("start-btn")
var nextButton = document.getElementById("next-btn")
var questionContainerEl = document.getElementById("question-container")
var leaderScore = document.getElementById("leaderScore");
var container = document.getElementById("container");
var timeLeft = 60;
var timerInterval = 0;
var timeClock = document.querySelector("#timer");
var yourScore = document.getElementById("yourScore");
var lastQuestionIndex = questionArr.length - 1;
var choiceAEl = document.getElementById("choiceA");
var choiceBEl = document.getElementById("choiceB");
var leaders = [];
var leaderList = document.getElementById("leader-list");
var submitButton = document.getElementById("submit-button");
var scoreInput = document.getElementById("score-text");
var name = document.getElementById("score-name");
var welcome = document.getElementById("welcome");
var highScoreLink = document.getElementById("highScore");


//Leaderboard
function initialize(){
    leaderScore.style.display = "none";
    container.style.display = "none";
    
    var lastUser = JSON.parse(localStorage.getItem("leaderHighScore"));
    if (lastUser !== null) {
      leaders = lastUser;
    }
}

//Start


// Call to action 'Start Quiz' by click of button
document.querySelector("start-btn").onclick('click',startQuiz);

function startQuiz() {
    container.style.display = "block";
    startButton.style.display = "none";
    welcome.style.display = "none";
    // Timer starts    
    timerInterval = setInterval(function() {
        timeLeft--;
        timeClock.textContent = timeLeft + " seconds left for quiz.";
        cueQuestions();

        if(timeLeft === 0) {
        leaderBoard();
        }

    }, 1000);

}

    
function cueQuestions(){
    questions.innerHTML = questionArr[i].question;
    choiceA.innerHTML = questionArr[i].choiceA;
    choiceB.innerHTML = questionArr[i].choiceB;
    choiceC.innerHTML = questionArr[i].choiceC;
};


document.getElementById("next-btn").onclick("click", function(){
     //If timer runs out OR questions finished time stops
    if (i > lastQuestionIndex){
        clearInterval(timerInterval);
        leaderBoard();
     }  else {
        cueQuestions();
        i++;
    }
});


function checkAnswer(answer){
    if (answer === questionArr[i].correct) {
         timeLeft +=10;
    } if (answer !== questionArr[i].correct){
        // decrease 15 seconds of time
        timeLeft -=5;
    } 
}


function leaderBoard(){
    container.style.display = "none";
    leaderScore.style.display = "block";
}


submitButton.addEventListener("click", function(event) {
    event.preventDefault();
           
     var scoreText = scoreInput.value.trim();
  
    // Return from function early if submitted scoreText is blank
    if (scoreText === "") {
    return;
    }

    var div = document.createElement("div");
    div.textContent = "Your score is:" +" " + timeLeft;
    leaderList.appendChild(div);
    
    leaderBoard();
    storeScore();    
    storeLeaders();
});

function storeScore(event) {
    leaders[leaders.length] = {
        names: scoreInput.value,
        savedScores: timeLeft
    }
}        

   
function storeLeaders() {
    // Stringify and set "scores" key in localStorage to leader array
    localStorage.setItem("leaderHighScore", JSON.stringify(leaders));
}

showScore();

function showScore(){
    var lastUser = JSON.parse(localStorage.getItem("leaderHighScore"));

    for (var i = 0; i < lastUser.length; i++) {
        console.log(lastUser[i].savedScores);
            var name = leaders[i].names;
            var score = leaders[i].savedScores;
            var div = document.createElement("div");
            div.textContent = name + " " +score;
            div.setAttribute("data-index", i);
            leaderList.appendChild(div);
          }
}
    
highScoreLink.addEventListener('click',function(){
    container.style.display = "none";
    startButton.style.display = "none";
    welcome.style.display = "none";
    leaderScore.style.display = "block";
});
