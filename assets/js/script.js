// Access element by ID using .querySelector()
const timerEl = document.querySelector("#timer");
const mainPresentation = document.querySelector("#main-presentation");
const question = document.querySelector("#question");
const startQuizBtn = document.querySelector("#start-quiz");
const possibleAnswersList = document.querySelector("#possible-answers");
const finalScore = document.querySelector("#final-score");
const questions = ["Commonly used data types DO NOT include: ", 
                   "The condition enclosed in a if/else statement is enclosed within ____.",
                    "Arrays in Javascript can be used to store "];
const possibleAnswers =[["strings","booleans","alerts","numbers"],
                ["quotes","curly brackets","parentheses","square brackets"],
                ["number and string","others arrays","booleans","all of the above"]];

const correctAnswers =[3,2,3];
// 10 minutes is the duration of the quiz: 10x60milliseconds = 600
const quizDuration = 600; 

var questionNumber;
var timerCount;
var timer;


function saveInitials(){
    let initialsInput = document.querySelector("#initials"); 
    let initialText = initialsInput.value.trim();
    var newScore = {
        initials: initialText,
        score: 7
    };
    let highscoresList = JSON.parse(localStorage.getItem("highscores"));
    if (highscoresList == null){
        highscoresList = [];
    }
    highscoresList.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscoresList));
    goToHighscoresPage();
}

function showFinalScore(){
    //hide question section
    question.style.display = "none";
    //show final score section
    finalScore.style.display = "block";
}

function showResponse(){
    const response= document.querySelector("#response");
    response.textContent ="Correct";
}

function renderQuestion(questionNumber){
    const questionTitle = document.querySelector("#question-title");
    // Display the question on the page
    questionTitle.textContent = questions[questionNumber];
    // Get the possible answers for the question
    let answers = possibleAnswers[questionNumber];
    //possibleAnswersList.innerHTML = "";
    let answersBtnsList = document.querySelectorAll(".answers");
    console.log(answersBtnsList);

    let answersIndex = 0;
    answersBtnsList.forEach(function(button){
        button.textContent = answers[answersIndex];
        button.setAttribute("data-answer-index", answersIndex);
        button.addEventListener("click", function(event) {
            let button = event.target;
            console.log(button.getAttribute("data-answer-index"));
            showResponse();
            let nextQuestion = ++questionNumber;
            if (nextQuestion < questions.length){
                renderQuestion(nextQuestion);
            }else{
                showFinalScore();
            }
        });
        ++answersIndex;
    });

}

function startQuiz(){
    //hide main presentation section
    mainPresentation.style.display = "none";
    //show question section
    question.style.display = "block";
    questionNumber = 0;
    timerCount = quizDuration;
    renderQuestion(questionNumber);
    startTimer();
};

function renderPresentation(){
    //show main presentation section
    mainPresentation.style.display = "block";
    //hide question section
    question.style.display = "none";
    //hide final score section
    finalScore.style.display ="none";
    timer = 0;
    timerEl
}

function renderFinalScore(){
    //hide question section
    question.style.display = "none";
    //show final score
    finalScore.style.display ="block";
}


function renderHighscores() {
    // Use JSON.parse() to convert text to JavaScript object
    var highscoresList = JSON.parse(localStorage.getItem('highscores'));
    // Check if data is returned, if not exit out of the function
    if (highscoresList !== null) {
      var scoresListEl = document.querySelector("#highscores");
      let scoreNumber = 0;
      highscoresList.forEach(scoreElement =>  {
        let scoreRow = document.createElement('li');
        scoreRow.textContent = `${++scoreNumber} . ${scoreElement.initials}-${scoreElement.score}`;
        scoresListEl.appendChild(scoreRow);
      });
    }
  }

//This function is called when user click on the "goBack" button on the highscores page
function goToHighscoresPage(){
    // The location.href is change to navigate to the index page
    location.href = "./highscores.html";
}

//This function is called when user click on the "goBack" button on the highscores page
function goToMainPage(){
    // The location.href is change to navigate to the index page
    location.href = "./index.html";
}

//This function is called when user click on the "clear Highscores" button on the highscores page
function clearHighscores(){
    localStorage.removeItem('highscores');
    var scoresListEl = document.querySelector("#highscores");
    scoresListEl.innerHTML="";
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (quizFinnished() && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        renderFinalScore();
      }
    }, 1000);
  }

function init(){
    //Check the pathname to know where the user is in
    if (location.pathname == '/index.html'){
        renderPresentation();
    } else {
        // (location.pathname == '/highscores.html')
        renderHighscores();
    }
}

init();