// Global variables 
var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("start-container");
var containerEndEl = document.getElementById("end-container");
var containerScoreEl = document.getElementById("score-banner");
var formInitials = document.getElementById("initials-form");
var containerHighScoresEl = document.getElementById("high-score-container");
var ViewHighScoreEl = document.getElementById("view-high-scores");
var listHighScoreEl = document.getElementById("high-score-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");

// Variables for buttons
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back");
var btnClearScoresEl = document.querySelector("#clear-high-scores");

// Question, answer, and timer variables
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;

// Array for high scores
var HighScores = [];

// Array for questions to create random order
var arrayShuffledQuestions
var QuestionIndex = 0

// ACTUAL questions used for the quiz
var questions = [
    {q: 'Arrays in Javascript can be used store _________.',
     a: 'D. All of the above.',
     choices: [{choice: 'A. Numbers'}, {choice: 'B. Booleans'}, {choice: 'C. Strings'}, {choice: 'D. All of the above'}]  
    },
    {q: 'How many elements can you apply an id attribute to?',
     a: 'B. 1',
     choices: [{choice: 'A. 128'}, {choice: 'B. 1'}, {choice: 'C. 35'}, {choice: 'D. All of the them'}] 
    },
    {q: 'What does DOM stand for?',
     a: 'A. Document Object Model',
     choices: [{choice: 'A. Document Object Model'}, {choice: 'B. Desktop Orientation Mode'}, {choice: 'C. Divas of Minnesota'}, {choice: 'D. Dominican Republic'}] 
    },
    {q: 'What HTML tags are JavaScript code wrapped in?',
     a: 'D. <script>',
     choices: [{choice: 'A. <list>'}, {choice: 'B. <header>'}, {choice: 'C. <div>'}, {choice: 'D. <script>'}] 
    },
    {q: 'To see if two variables are equal in an if/else statement, you would use _____.',
     a: 'C. ==',
     choices: [{choice: 'A. ='}, {choice: 'B. >'}, {choice: 'C. =='}, {choice: 'D. !='}] 
    },
    {q: 'What is getItem commonly used for?', 
     a: 'B. Local storage', 
     choices: [{choice: 'A. Adding pizzazz'}, {choice: 'B. Local storage'}, {choice: 'C. Instacart orders'}, {choice: 'D. To name an element'}]
    },
];

// When the go back button is used from the high scores page: 
var renderStartPage = function () {
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("show")
    containerStartEl.classList.remove("hide")
    containerStartEl.classList.add("show")
    containerScoreEl.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timerEl.textContent = 0
    score = 0
  
    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}

// Timer function
// Sets timer to 30 seconds to begin with
var setTime = function () {
    timeleft = 30;

// Consistently checks timer and counts down every second
var timercheck = setInterval(function() {
    timerEl.innerText = timeleft;
    timeleft--
    
    // When game is over, or if there is still time left
    if (gameover) {
        clearInterval(timercheck);
    }
   
    if (timeleft < 0) {
        showScore();
        timerEl.innerText = 0;
        clearInterval(timercheck);
    }
  
    }, 1000)
}

// When starting the game, add classList to hide/show certain displays
var startGame = function() {
    containerStartEl.classList.add('hide');
    containerStartEl.classList.remove('show');
    containerQuestionEl.classList.remove('hide');
    containerQuestionEl.classList.add('show');

    // Shuffle questions so that they appear in random order--> use Math function to help with the randomness
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5);
    setTime()
    setQuestion()
}

// Next question on the quiz appears
var setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

// Remove answer choice buttons
var resetAnswers = function() {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild);
    }
}

// Display question and answer choices: 
var displayQuestion = function(index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
    }
}

// When there is a correct answer on the screen:
var answerCorrect = function() {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide");
        correctEl.classList.add("banner");
        wrongEl.classList.remove("banner");
        wrongEl.classList.add("hide");
    }
} 

// When there is a wrong answer on the screen: 
var answerWrong = function() {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide");
        wrongEl.classList.add("banner");
        correctEl.classList.remove("banner");
        correctEl.classList.add("hide");
    }
}

// To check if answer is actually correct: 
var answerCheck = function(event) {
    var selectedanswer = event.target
        if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
            answerCorrect();
            score = score + 2;
        }
        else {
          answerWrong();
          score = score - 1;
          timeleft = timeleft - 5;
        };

        // To move to next question, and see if there are other questions
        QuestionIndex++
        if (arrayShuffledQuestions.length > QuestionIndex + 1) {
            setQuestion();
        }   
        else {
            gameover = "true";
            showScore();
        }
}

// For total score at the end of the game--> display as its own screen 
var showScore = function () {
    containerQuestionEl.classList.add("hide");
    containerEndEl.classList.remove("hide");
    containerEndEl.classList.add("show");
  
    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
}       

// High score values
var createHighScore = function(event) {
    event.preventDefault() 
    var initials = document.querySelector("#initials").value;
    if (!initials) {
      alert("Enter your intials!");
      return;
    }

    formInitials.reset();

    var HighScore = {
        initials: initials,
        score: score
        } 
  
    //Sort scores
    HighScores.push(HighScore);
    HighScores.sort((a, b) => {return b.score-a.score});

    // To resort the visible score
    // while: will loop thtough the code as long as the specified condition is true
    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }

    // When there are multiple high scores, from greatest to least
    for (var i = 0; i < HighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
    }
    saveHighScore();
    displayHighScores();
}

// To save the high score: use localStorage function
// localStorage: stores the data to the webpage
// JSON.stringify: allows for the data to become a string
var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))
}

// To reload the same high scores when the page is refreshed--> they should now be stored
// JSON.parse: used to parse the data from the webpage to become an object in 
var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
        if (!LoadedHighScores) {
        return false;
        }
  
    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => {return b.score-a.score})
  
  
    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
  
        HighScores.push(LoadedHighScores[i]);
    }
} 

// To link high scores page from the main start page: 
var displayHighScores = function() {
    containerHighScoresEl.classList.remove("hide");
    containerHighScoresEl.classList.add("show");
    gameover = "true"
  
    if (containerEndEl.className = "show") {
        containerEndEl.classList.remove("show");
        containerEndEl.classList.add("hide");
        }
    if (containerStartEl.className = "show") {
        containerStartEl.classList.remove("show");
        containerStartEl.classList.add("hide");
        }
    if (containerQuestionEl.className = "show") {
        containerQuestionEl.classList.remove("show");
        containerQuestionEl.classList.add("hide");
        }
    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
}

// To clear the high scores page: 
var clearScores = function () {
    HighScores = [];
  
    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }
  
    localStorage.clear(HighScores);
}

loadHighScore()

//Button Clicks: 
    // On start click, start game
    btnStartEl.addEventListener("click", startGame);
    // When using submit button: click to enter
    formInitials.addEventListener("submit", createHighScore);
    // To view the high scores 
    ViewHighScoreEl.addEventListener("click", displayHighScores);
    // Go back button
    btnGoBackEl.addEventListener("click", renderStartPage);
    // Clear scores button
    btnClearScoresEl.addEventListener("click", clearScores);