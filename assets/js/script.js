// Access element by ID using .querySelector()
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

var questionNumber;

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
            renderQuestion(++questionNumber);
        });
        ++answersIndex;
    });

    /*
    let answers = possibleAnswers[questionNumber];
    let possibleAnswersList = question.getElementsByTagName("ul");
    todoList.innerHTML = "";
    todoCountSpan.textContent = todos.length;
  
    for (var i = 0; i < questions.length; i++) {
        var todo = todos[i];

        var li = document.createElement("li");
        li.textContent = todo;
        li.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.textContent = "Complete ✔️";

        li.appendChild(button);
        todoList.appendChild(li);
    }*/
}

function startQuiz(){
    //hide main presentation section
    mainPresentation.style.display = "none";
    //show question section
    question.style.display = "block";
    questionNumber = 0;
    renderQuestion(questionNumber);
    
};

function renderPresentation(){
    //show main presentation section
    mainPresentation.style.display = "block";
    //hide question section
    question.style.display = "none";
    //hide final score section
    finalScore.style.display ="none";
}

function renderFinalScore(){
    //hide question section
    question.style.display = "none";
    //show final score
    finalScore.style.display ="block";
}

/*

function renderPresentation(){
    mainPresentation.setAttribute("style", "display : block");
    question.setAttribute("style", "display : none");
    startQuizBtn.addEventListener("click", function(){
        //hide main presentation section
        mainPresentation.style.display = "none";
        //show question section
        question.style.display = "block";
    });
    /*
    let mainTitle = document.createElement("h1");
    mainTitle.textContent = "Coding Quiz Challenge";
    mainTitle.setAttribute("style", "text-align: center");
    mainPresentation.appendChild(mainTitle);
    let description = document.createElement("p");
    description.textContent = "Try answer the following code-related questions within the time limit. Keep in mind that incorrect answer will penalize your scoretime by ten seconds.";
    description.setAttribute("style", "text-align: center");
    mainPresentation.appendChild(description);
    let startQuizBtn = document.createElement("button");
    startQuizBtn.textContent = "Start Quiz";
    startQuizBtn.addEventListener("click", function(){
        //hide main presentation section
        mainPresentation.setAttribute("display","none");
        //show question section
        question.setAttribute("display","block");
    });
    mainPresentation.appendChild(startQuizBtn);
    
} */

//This function is called when user click on the "goBack" button on the highscores page
function goToMainPage(){
    // The location.href is change to navigate to the index page
    location.href = "./index.html";
    renderPresentation;
}

function saveScore() {
    // Save related form data as an object
    /*
    let playerScore = {
      initials: .value,
      score: grade.value,
    };
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem('playerScore', JSON.stringify(playerScore));
    */
  }
  
  function renderHighscores() {
    /*
    // Use JSON.parse() to convert text to JavaScript object
    var lastGrade = JSON.parse(localStorage.getItem('studentGrade'));
    // Check if data is returned, if not exit out of the function
    if (lastGrade !== null) {
      document.getElementById('saved-name').innerHTML = lastGrade.student;
      document.getElementById('saved-grade').innerHTML = lastGrade.grade;
      document.getElementById('saved-comment').innerHTML = lastGrade.comment;
    }
    */
  }
  
  /*
  saveButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveLastGrade();
    renderLastGrade();
  });
  */

//This function is called when user click on the "clear Highscores" button on the highscores page
function clearHighscores(){
}

function init(){
    renderPresentation();
}

init();