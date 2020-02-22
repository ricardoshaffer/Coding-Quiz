
 //   $(document).ready(function() {
// variables for data attribution and processing
let currentQuestionNo= 0;
let possibleAnswers = document.getElementById("myList");
var showTimer = document.getElementById("time");
let timerId;
let multiChoice;
let passedValue;
let feedbackEl = document.getElementById("feedbackEl");
document.getElementById("fading");

let time = 75;



startQuiz();
function startQuiz() {
  showTimer.textContent = time;
  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time

 getQuestion();

}

function getQuestion() {

    // get current question object from array
    currentQuestion = jsQuizQuestions[currentQuestionNo];
    // update title with current question
    let theQuestion = document.getElementById("Question");
    possibleAnswers.innerHTML = "";
    let questionNumber = ([currentQuestionNo + 1] + ". ");
    theQuestion.textContent = (questionNumber + currentQuestion.question);
    console.log(theQuestion.textContent);
    // loop over choices
    currentQuestion.multiChoice.forEach(function(theChoice, i) {
      // create new button for each choice
      let selectedAnswer = document.createElement("button");
      selectedAnswer.setAttribute("class", "list-group-item list-group-item-action");
      selectedAnswer.setAttribute("data-toggle", "list");
      selectedAnswer.setAttribute("value", theChoice);
      selectedAnswer.setAttribute("role", "tab");
      selectedAnswer.textContent = i + 1 + ". " + theChoice;
      // listening for a click on the answer
      // display on the page
      selectedAnswer.onclick = getValue;
      possibleAnswers.appendChild(selectedAnswer);
      console.log("question Number: " + theChoice);

    });
  
  passedValue = (jsQuizQuestions[currentQuestionNo].correctAnswer);

  ///// NEXT QUESTION FUNCTION

  function getValue() {
  // check if user guessed wrong
  if (this.value !== passedValue) {
    console.log(jsQuizQuestions[currentQuestionNo].correctAnswer);
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    showTimer.textContent = time;
    feedbackEl.textContent = "INCORRECT";
    console.log(jsQuizQuestions[currentQuestionNo].correctAnswer);
    feedbackEl.setAttribute("class", "p-3 mb-2 bg-danger text-white showing");
    feedbackEl.setAttribute("class", "p-3 mb-2 bg-danger text-white");
  } else {
    feedbackEl.textContent = "YOU GOT IT!";
    feedbackEl.setAttribute("class", "p-3 mb-2 bg-success text-white showing");
    feedbackEl.setAttribute("class", "p-3 mb-2 bg-success text-white");

  };
  
  currentQuestionNo ++;
  if(currentQuestionNo < jsQuizQuestions.length){
  getQuestion();
  console.log("question length: " + jsQuizQuestions.length);
 
  } else {
    feedbackEl.textContent = "YOU'RE DONE'!";
  }
  }
 
}
function clockTick() {
  // update time
  time--;
  showTimer.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}
function quizEnd() {
  // stop timer
  clearInterval(showTimer);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  theQuestion.setAttribute("class", "hide");
}
//});