
// variables for data attribution and processing
let currentQuestionNo= 0;
let possibleAnswers = document.getElementById("myList");
var showTimer = document.getElementById("time");
let timerId;
let multiChoice;
let passedValue;
let feedbackEl = document.getElementById("feedbackEl");
document.getElementById("fading");

let time = 50; //set at 10 seconds a question



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
// display question options
    currentQuestion.multiChoice.forEach(function(theChoice, i) {
// create button for each option
      let selectedAnswer = document.createElement("button");
      selectedAnswer.setAttribute("class", "list-group-item list-group-item-action");
      selectedAnswer.setAttribute("data-toggle", "list");
      selectedAnswer.setAttribute("value", theChoice);
      selectedAnswer.setAttribute("role", "tab");
// display on the page
      selectedAnswer.textContent = i + 1 + ". " + theChoice;
// processing click on the answer
      selectedAnswer.onclick = getValue;
      possibleAnswers.appendChild(selectedAnswer);
      console.log("question Number: " + theChoice);

    });
// create actual question to push to getValue function
  passedValue = (jsQuizQuestions[currentQuestionNo].correctAnswer);

  ///// NEXT QUESTION FUNCTION

  function getValue() {
// if it's a wrong answer
  if (this.value !== passedValue) {
    console.log(jsQuizQuestions[currentQuestionNo].correctAnswer);
    time -= 10;
    if (time < 0) {
      time = 0;
    }
// display new time on page
    showTimer.textContent = time;
// stylizing and presenting incorrect answer
    feedbackEl.textContent = "INCORRECT";
    console.log(jsQuizQuestions[currentQuestionNo].correctAnswer);
    feedbackEl.setAttribute("class", "p-3 mb-2 bg-danger text-white showing");
    feedbackEl.setAttribute("class", "p-3 mb-2 bg-danger text-white");
  } else {
// stylizing and presenting correct answer
    feedbackEl.textContent = "YOU GOT IT!";
    feedbackEl.setAttribute("class", "p-3 mb-2 bg-success text-white showing");
    feedbackEl.setAttribute("class", "p-3 mb-2 bg-success text-white");

  };
// move on to the next question
  currentQuestionNo ++;
  if(currentQuestionNo < jsQuizQuestions.length){
  getQuestion();
  console.log("question length: " + jsQuizQuestions.length);
 // processes end of quiz
  } else {
    feedbackEl.setAttribute("class", "hiding");
    showTimer.setAttribute =("class", "p-3 mb-2 bg-success text-white showing");
    showTimer.textContent = "You're done!";
    clearInterval(time);
  }
  }
 
}
function clockTick() {
  // update time
  time--;
  showTimer.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}
function quizEnd() {
  // stop timer
  clearInterval(time);
  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  theQuestion.setAttribute("class", "hide");
}