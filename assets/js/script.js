// Access element by ID using .querySelector()
const timerEl = document.querySelector("#timer");
const mainPresentation = document.querySelector("#main-presentation");
const questionEl = document.querySelector("#question");
const response= document.querySelector("#response");
const startQuizBtn = document.querySelector("#start-quiz");
const possibleAnswersList = document.querySelector("#possible-answers");
const finalScore = document.querySelector("#final-score");
const questions = ["Commonly used data types DO NOT include: ", 
                   "The condition enclosed in a if/else statement is enclosed within ____.",
                   "Arrays in Javascript can be used to store.",
                   "String values must be enclosed within ____ when being assigned to variables.",
                   "A very useful tool used during development and debugging for printing content to the debugger is:"];
const possibleAnswers =[["strings","booleans","alerts","numbers"],
                ["quotes","curly brackets","parentheses","square brackets"],
                ["number and string","others arrays","booleans","all of the above"],
                ["commas","curly brackets","quotes","parentheses"],
                ["JavaScript","terminal/bash","for loops","console.log"]];

const correctAnswers =["alerts","parentheses","all of the above","quotes","console.log"];
// 5 minutes is the duration of the quiz: 10x60milliseconds = 600
const quizDuration = 100;
const penalizationCost =10;

var questionNumber;
var timerCount;
var timer;
var questionsList = [];

class Question {
    constructor(questionText, answerChoices, correctAnswer) {
        this.questionText = questionText;
        this.answerChoices = answerChoices;
        this.correctAnswer = correctAnswer;
    }
    isAnswerCorrect(answer) {
        return this.correctAnswer == answer;
    }
}

function fillQuestionsList(){
    for (i=0; i< questions.length;i++){
        questionsList.push(new Question(questions[i],possibleAnswers[i], correctAnswers[i]));
    }
}

function saveInitials(){
    let initialsInput = document.querySelector("#initials"); 
    let initialText = initialsInput.value.trim();
    var newScore = {
        initials: initialText,
        score: timerCount
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
    questionEl.style.display = "none";
    //show final score section
    finalScore.style.display = "block";
}

function showResponse(correct){
    response.innerHTML="";
    if (correct){
        response.textContent ="Correct";
    }else{
        response.textContent ="Wrong";
        //Discount time for a wrong answer
        timerCount -= penalizationCost;
    } 
}

// delete the result when the user mouseover the initials input box
function cleanResponse(){
    response.innerHTML="";
}

function createAButtonOption(answerOption){
    let answerRow = document.createElement('li');
    let answerButton = document.createElement('button');
    answerButton.textContent = answerOption;
    answerButton.setAttribute("data-question-number", questionNumber);
    answerButton.setAttribute("data-answer", answerOption);
    answerButton.addEventListener("click", function(event) {
            const buttonOption = event.target;
            let questionObj = questionsList[buttonOption.getAttribute("data-question-number")];
            showResponse(questionObj.isAnswerCorrect(buttonOption.getAttribute("data-answer")));
            ++questionNumber;
            if (questionNumber < questions.length){
                renderQuestion();
            }else{
                stopTimer();
                showFinalScore();
            }
        });
    answerRow.appendChild(answerButton);
    possibleAnswersList.appendChild(answerRow);
}

function renderQuestion(){
    const questionTitle = document.querySelector("#question-title");
    // Display the question on the page
    let currentQuestion = questionsList[questionNumber];
    questionTitle.textContent = currentQuestion.questionText;
    // Get the possible answers for the question
    let answers = currentQuestion.answerChoices;
    let answersBtnsList = document.querySelectorAll(".answers");
    //Delete answer options for the previous question
    possibleAnswersList.innerHTML="";
    answers.forEach( answerOption => createAButtonOption(answerOption));
}

function startQuiz(){
    //hide main presentation section
    mainPresentation.style.display = "none";
    //show question section
    questionEl.style.display = "block";
    questionNumber = 0;
    renderQuestion();
    startTimer();
};

function renderPresentation(){
    //show main presentation section
    mainPresentation.style.display = "block";
    //hide question section
    questionEl.style.display = "none";
    //hide final score section
    finalScore.style.display ="none";
    timerCount = quizDuration;
    timerEl.textContent = timerCount;
}

function renderFinalScore(){
    //hide question section
    questionEl.style.display = "none";
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

function quizFinnished(){
    return (questionNumber == questions.length);
}

function stopTimer(){
    // Clears interval and stops timer
    clearInterval(timer);
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      // Tests if time has run out
      if (timerCount === 0){ 
        stopTimer();
        renderFinalScore();
      }
    }, 1000);
  }

function init(){
    //Check the pathname to know where the user is in
    if (location.pathname == '/index.html'){
        renderPresentation();
        if (questionsList.length ==0){
            fillQuestionsList();
            console.log(questionsList);
        }
    } else {
        // (location.pathname == '/highscores.html')
        renderHighscores();
    }
}

init();