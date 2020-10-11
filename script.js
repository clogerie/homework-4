// Stores questions, choices, and answers
var questions = [
    {
      question: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts",
    },
    {
      question: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses",
    },
    {
      question: "Which of the following selects an ID?",
      choices: ["#", ".", "*", "$"],
      answer: "#",
    },
    {
      question: "Which of the following selects a class?",
      choices: [".", "^", "#", "@"],
      answer: ".",
    },
    {
      question: "The box model includes all exept____.",
      choices: ["margin", "padding", "square brackets", "content", "border" ],
      answer: "square brackets",
    },
  ];
  
  var questionEl = document.querySelector("#question");
  var optionListEl = document.querySelector("#option-list");
  var questionResultEl = document.querySelector("#question-result");
  var timerEl = document.querySelector("#timer");
  var startBtn = document.querySelector("#start-button");
  
  var questionIndex = 0;
  var correctCount = 0;
  var time = 60;
  var intervalID;
  
  var timeInterval
  
  // function to start quiz
  function startQuiz() {
    timeInterval = setInterval(function () {
      time--;
      timerEl.textContent = time
      if (time === 0) {
        clearInterval(timeInterval)
      }
    }, 1000)
    renderQuestion()
    console.log("start")
  }
  
  // function to end quiz
  function endQuiz() {
    clearInterval(intervalID);
    document.body.innerHTML = "Game over, You scored" + correctCount;
    setTimeout(showHighScore, 2000)
  }
  
  // function to display score
  function showHighScore() {
    var scores = []
    var name = prompt("What is your name?");
    var user = {
      name: name,
      score: correctCount
    }
    scores.push(user);
    scores.sort(function (a, b) {
      return b.score - a.score
    })
    localStorage.setItem("scores", JSON.stringify(scores))
  
    var high_score = JSON.parse(localStorage.getItem("scores"));
  
  
    if (high_score) {
      var contentUl = document.createElement("ul");
      for (var i = 0; i < high_score.length; i++) {
        var contentLi = document.createElement("li");
        contentLi.textContent = "Name: " + high_score[i].name + " Score:" + high_score[i].score;
        contentUl.append(contentLi);
      }
    } else {
      high_score = JSON.parse(high_score)
    }
    document.body.append(contentUl);
  }
  
  // Updates time
  function updateTime() {
    if (time === 0) {
      endQuiz();
    }
  }
  
  function renderQuestion() {
    if (time === 0) {
      endQuiz();
    }
  
    //generate questions
    questionEl.textContent = questions[questionIndex].question;
    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";
  
    var choices = questions[questionIndex].choices;
    var choicesLength = choices.length;
  
    for (var i = 0; i < choicesLength; i++) {
      var questionListItem = document.createElement("li");
      questionListItem.textContent = choices[i];
      optionListEl.append(questionListItem);
    }
  }
  
  // Displays next question
  function nextQuestion() {
    questionIndex++
    if (questionIndex === questions.length) {
      endQuiz();
    }
    renderQuestion();
  
  }
  
  // Checks answers to questions
  function checkAnswer(event) {
    clearInterval(intervalID);
    var target = event.target;
    if (event.target.matches("li")) {
  
      var answer = event.target.textContent;
  
      if (answer === questions[questionIndex].answer) {
        questionResultEl.textContent = "Correct"
        correctCount++;
      } else {
        questionResultEl.textContent = "Incorrect"
        time -= 2;
      }
  
    }
    setTimeout(nextQuestion, 2000);
  }
  
  optionListEl.addEventListener("click", checkAnswer);
  
  startBtn.addEventListener("click", startQuiz);
  