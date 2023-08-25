// Access element by ID using .querySelector()
let goBackBtn = document.querySelector("#go-back");

goBackBtn.addEventListener("click", function(){
    // The location.href is change to navigate to the index page
    location.href = "./index.html";
});