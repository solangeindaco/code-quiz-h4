// Access element by ID using .querySelector()
let mainPresentation = document.querySelector("#main-presentation");
let question = document.querySelector("#question");
let startQuizBtn = document.querySelector("#start-quiz");

startQuizBtn.addEventListener("click", function(){
    //hide main presentation section
    mainPresentation.setAttribute("display","none");
    //show question section
    question.setAttribute("display","block");
});

//This function is called when user click on the "goBack" button on the highscores page
function goToMainPage(){
    // The location.href is change to navigate to the index page
    location.href = "./index.html";
}

//This function is called when user click on the "clear Highscores" button on the highscores page
function clearHighscores(){

}
