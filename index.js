function Quiz(questions) {
  this.score = 0;
  this.currQuestIndex = 0;
  this.questions = questions;
}

Quiz.prototype.getCurrentQuestionIndex = function () {
  return this.questions[this.currQuestIndex];
};

Quiz.prototype.isEnded = function () {
  return this.currQuestIndex === this.questions.length;
};

//Function will do 3 things
// 1. Validate the answer
// 2. Update the score
// 3. Increment the current index
Quiz.prototype.validateAnswerAndUpdateScore = function (choice) {
  let question = this.getCurrentQuestionIndex();
  if (question.answer === choice) {
    this.score++;
  }
  this.currQuestIndex++;
};

function Question(text, options, answer) {
  this.text = text;
  this.options = options;
  this.answer = answer;
}

let questions = [
  new Question(
    "JavaScript is a ",
    ["Language", "Programming Language", "Development", "All"],
    "Programming Language"
  ),
  new Question(
    "Javascript is an _______ language?",
    ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
    "Object-Oriented"
  ),
  new Question(
    "Which of the following keywords is used to define a variable in Javascript?",
    ["var", "let", "Both A and B", "None of the above"],
    "Both A and B"
  ),
  new Question(
    "How can a datatype be declared to be a constant type?",
    ["const", "var", "let", "constant"],
    "const"
  ),
];

function showScores() {
  console.log("Scores :-", quiz.score);
  let gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += `<h2 id='score'> Your Scores: ${
    quiz.score + "/" + questions.length
  } <br>Percentage: ${(quiz.score / questions.length) * 100} </h1>`;
  document.getElementById("quiz").innerHTML = gameOverHTML;
}

function loadQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    //Show current question!
    let curQuest = quiz.getCurrentQuestionIndex();
    if (curQuest.text) {
      let questionEle = document.getElementById("question");
      questionEle.innerHTML = curQuest.text;

      //Show current question's options
      let options = curQuest.options;
      for (var i = 0; i < options.length; i++) {
        let currOption = options[i];
        let eachOptElement = document.getElementById("choice" + i);
        eachOptElement.innerHTML = currOption;
        handleOptionBtn("btn" + i, currOption);
      }
    }
    showProgress();
  }
}

function showProgress() {
  let curQuestNumber = quiz.currQuestIndex + 1;
  let progress = document.getElementById("progress");
  progress.innerHTML = `Question ${curQuestNumber} of ${quiz.questions.length}`;
}

function handleOptionBtn(btnId, choice) {
  let btn = document.getElementById(btnId);
  btn.onclick = () => {
    quiz.validateAnswerAndUpdateScore(choice);
    loadQuestions();
  };
}

let quiz = new Quiz(questions);

//Load questions
loadQuestions();
