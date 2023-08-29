// Access element by ID using .querySelector()
const timerEl = document.querySelector("#timer");
const mainPresentation = document.querySelector("#main-presentation");
const questionEl = document.querySelector("#question");
const response= document.querySelector("#response");
const startQuizBtn = document.querySelector("#start-quiz");
const possibleAnswersList = document.querySelector("#possible-answers");
const finalScore = document.querySelector("#final-score");
const submitEl = document.querySelector("#submit");
var score = document.querySelector("#score");
//Static question of the quiz
const questions = ["Commonly used data types DO NOT include: ", 
                   "The condition enclosed in a if/else statement is enclosed within ____.",
                   "Arrays in Javascript can be used to store.",
                   "String values must be enclosed within ____ when being assigned to variables.",
                   "A very useful tool used during development and debugging for printing content to the debugger is:"];

//Possible answers of the questions declared above. 
//The possibleAnswers[j] will contain the possible answers for the question storaged in questions[j]
const possibleAnswers =[["strings","booleans","alerts","numbers"],
                ["quotes","curly brackets","parentheses","square brackets"],
                ["number and string","others arrays","booleans","all of the above"],
                ["commas","curly brackets","quotes","parentheses"],
                ["JavaScript","terminal/bash","for loops","console.log"]];

const correctAnswers =["alerts","parentheses","all of the above","quotes","console.log"];
// 5 minutes is the duration of the quiz: 10x60milliseconds = 600
const quizDuration = 5;
const penalizationCost =10;

var questionNumber;
var timerCount;
var timer;
var questionsList = [];

// Declare a class to model the questions of the quiz
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

//Create a list of question from static questions and answers arrays declared above
function fillQuestionsList(){
    for (i=0; i< questions.length;i++){
        questionsList.push(new Question(questions[i],possibleAnswers[i], correctAnswers[i]));
    }
}

//Save the score to the highscore list and then send the user to the highscores page
function saveInitials(event){
    event.preventDefault();
    let initialsInput = document.querySelector("#initials"); 
    //Deletes all the white spaces on the begining and end of the initials, 
    let initialText = initialsInput.value.trim();
    //create a new score with the initials of the user
    var newScore = {
        initials: initialText,
        score: timerCount
    };
    //Get all highscores from the local storage
    // Construct a js object from a string
    let highscoresList = JSON.parse(localStorage.getItem("highscores"));
    if (highscoresList == null){
        highscoresList = [];
    }
    highscoresList.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscoresList));
    goToHighscoresPage();
}

//It show the final score to the user
//Add an event listener to the submit button to save the initials of the user
function showFinalScore(){
    //hide question section
    questionEl.style.display = "none";
    //show final score section
    finalScore.style.display = "block";
    if (timerCount<0){
        timerCount = 0;   
    }
    score.textContent= timerCount;
    submitEl.addEventListener("click",saveInitials);
}

//Show the user wheather his/her response was correct or not
//If it is wrong the time will be discounted the penalizationCost that is 10 seconds
function showResponse(correct){
    response.innerHTML="";
    if (correct){
        response.textContent ="Correct";
    }else{
        response.textContent ="Wrong";
        //Discount time for a wrong answer
        if (timerCount > penalizationCost){
            timerCount -= penalizationCost;
        }else {
            timerCount = 0;
        }
        timerEl.textContent = timerCount;
    } 
}

// delete the result when the user mouseover the initials input box
function cleanResponse(){
    response.innerHTML="";
}

// Creates a list item with a button to show the possible answer to the user
function createButtonOption(answerOption, index){
    let answerRow = document.createElement('li');
    let answerButton = document.createElement('button');
    answerButton.textContent = `${index + 1}. ${answerOption}`;
    answerButton.setAttribute("data-question-number", questionNumber);
    answerButton.setAttribute("data-answer", answerOption);
    answerButton.setAttribute("class","purple-btn");
    //Add a event listener that call a function that show if the answer is correct o not
    //Then it send the user to the following question if there is any or 
    //Stop the timer and send the user to save his/her initials 
    answerButton.addEventListener("click", function(event) {
            const buttonOption = event.target;
            let questionObj = questionsList[buttonOption.getAttribute("data-question-number")];
            showResponse(questionObj.isAnswerCorrect(buttonOption.getAttribute("data-answer")));
            ++questionNumber;
            if (questionNumber < questions.length){
                renderQuestion();
            }else{// the user answer the last question
                // the timer will stop
                stopTimer();
                // it will show the user his/her final score
                showFinalScore();
            }
        });
    answerRow.appendChild(answerButton);
    possibleAnswersList.appendChild(answerRow);
}

// Display the current question and its possible answers on the page
function renderQuestion(){
    const questionTitle = document.querySelector("#question-title");
    // Get the current question object
    let currentQuestion = questionsList[questionNumber];
    // Display the question to the user
    questionTitle.textContent = currentQuestion.questionText;
    // Get the possible answers for the question
    let answers = currentQuestion.answerChoices;
    //Delete answer options for the previous question
    possibleAnswersList.innerHTML="";
    //Create a button per possible answer
    answers.forEach( (answerOption, index) => createButtonOption(answerOption, index));
}

//This function is called when the user clicks the button "start quiz"
function startQuiz(){
    //hide main presentation section
    mainPresentation.style.display = "none";
    //show question section
    questionEl.style.display = "block";
    questionNumber = 0;
    // Render the first question
    renderQuestion();
    // Start the timer, reducing the time every second 
    startTimer();
};

//Render the main presentation of the quiz
//Hidding the question section and the final score question
function renderPresentation(){
    //show main presentation section
    mainPresentation.style.display = "block";
    //hide question section
    questionEl.style.display = "none";
    //hide final score section
    finalScore.style.display ="none";
    //Init the timer using the constant quizDuration
    timerCount = quizDuration;
    timerEl.textContent = timerCount;
}
//It render the highscores dinamically to the user if there is any
function renderHighscores() {
    // Use JSON.parse() to convert text to JavaScript object
    var highscoresList = JSON.parse(localStorage.getItem('highscores'));
    // Check if data is returned, if not exit out of the function
    if (highscoresList !== null) {
      var scoresListEl = document.querySelector("#highscores");
      let scoreNumber = 0;
      //it create a list element per every score in the highscore list to display to the user
      highscoresList.forEach(scoreElement =>  {
        let scoreRow = document.createElement('li');
        //To each list iten it assign a css class "highscores-item"
        scoreRow.setAttribute("class","highscores-item");
        scoreRow.textContent = `${++scoreNumber}. ${scoreElement.initials}-${scoreElement.score}`;
        scoresListEl.appendChild(scoreRow);
      });
    }
  }

//This function is called when the user save his/her initials
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
    //Deletes all previous scores, list item of the list highscores
    scoresListEl.innerHTML="";
}

function stopTimer(){
    // Clears interval and stops timer
    clearInterval(timer);
}

// The setTimer function starts timer and stops it when the timerCount reach 0. 
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      // Tests if time has run out
      if (timerCount <= 0){ 
        stopTimer();
        showFinalScore();
      }else{
        timerCount--;
        timerEl.textContent = timerCount;
      }
    }, 1000); // it dicount the timerCount every second
  }

function init(){
    //Check the pathname to know where the user is in
    if (location.pathname == '/index.html'){
        renderPresentation();
        //If the list of questions if empty, it will fill it que the static questions in "questions" 
        // declared at the begining of the file. 
        if (questionsList.length ==0){
            fillQuestionsList();
        }
    } else {
        // (location.pathname == '/highscores.html')
        renderHighscores();
    }
}
//It called to show the main presentation of the quiz or the highscores
init();