"use strict";

var _main = require("./constants/main.js");

var _questions = require("./constants/questions.js");

window.addEventListener('load', function () {
  var LTS = document.getElementsByClassName("letter__wrap");
  var searchInp = document.getElementById("search");
  var searchResults = document.getElementById("search-results");
  var res = [];
  var startBtn = document.querySelector(".form__button");
  startBtn.addEventListener("click", function () {
    startBtn.innerHTML = "Siguiente";
  }); // Questions states

  var currentQuestion = 0;

  var setCurrentQuestion = function setCurrentQuestion(num) {
    return currentQuestion = num;
  }; // Answers states


  var selectedAnswer = null;

  var setSelectedAnswer = function setSelectedAnswer(num) {
    return selectedAnswer = num;
  };

  var correctAnswer = null;

  var setCorrectAnswer = function setCorrectAnswer(num) {
    return correctAnswer = num;
  }; // Results states


  var correctAnswers = 0;

  var setCorrectAnswers = function setCorrectAnswers(num) {
    return correctAnswers = num;
  };

  var wrongAnswers = 0;

  var setWrongAnswers = function setWrongAnswers(num) {
    return wrongAnswers = num;
  };

  var time = 0; // in ms * 100

  var counter = setInterval(function () {
    time++;
  }, 100);

  var showQuestion = function showQuestion() {
    // Select question and sum up the number of questions
    var questionToShow = _questions.questions[currentQuestion];
    setCurrentQuestion(currentQuestion + 1);
    setCorrectAnswer(questionToShow.correct); // Select the needed elements

    var questionTitle = document.getElementById("formQuestion");
    var answersWrapper = document.getElementById("formAnswers"); // Show the question title

    questionTitle.innerHTML = questionToShow.title; // Show posible answers for current question, using a template

    var ansTemplate = function ansTemplate(text, n, isMultiple) {
      // Create a element using bootstrap classes
      return !isMultiple ? "<div class=\"form-check\">\n            <input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDefault\" id=\"flexRadioDefault".concat(n, "\">\n            <label class=\"form-check-label\" for=\"flexRadioDefault").concat(n, "\">\n              ").concat(text, "\n            </label>\n            </div>") : "<div class=\"form-check\">\n                <input class=\"form-check-input\" type=\"checkbox\" name=\"flexCheckboxDefault\" id=\"flexCheckboxDefault".concat(n, "\">    \n                <label class=\"form-check-label\" for=\"flexCheckboxDefault").concat(n, "\">\n                ").concat(text, "   \n            </label>\n            </div>");
    }; // Clear the answers wrapper


    answersWrapper.innerHTML = ""; // Show the answers

    questionToShow.answers.forEach(function (answer, i) {
      answersWrapper.innerHTML += ansTemplate(answer, i, _questions.questions[currentQuestion - 1].multianswer);
    });
    setSelectedAnswer(null);
    document.querySelectorAll(".form-check").forEach(function (el, i) {
      el.addEventListener('click', function () {
        setSelectedAnswer(i);
      });
    });
  };

  var showResults = function showResults() {
    // Select the needed elements
    var questionTitle = document.getElementById("formQuestion");
    var answersWrapper = document.getElementById("formAnswers");
    counter = clearInterval(counter);

    var getScore = function getScore() {
      return (correctAnswers / (correctAnswers + wrongAnswers) * 10).toFixed(2);
    }; // Show "Resultados" as the question title


    questionTitle.innerHTML = "Resultados"; // Clear the answers wrapper

    answersWrapper.innerHTML = ""; // Show the results

    answersWrapper.innerHTML = "<h2>".concat(getScore(), "</h2><br/><p>Tardaste: ").concat(time * 0.1, " segundos</p>");
  };

  var toggleTransition = function toggleTransition() {
    // Set on click className form__transition to form__transition-d 
    startBtn.addEventListener('click', function (e) {
      if (correctAnswer != null && selectedAnswer == null) {
        e.preventDefault();
        return;
      }

      var tr = document.querySelector(".form__transition-d");
      tr.classList.add("form__transition"); // If the user finished the quiz, show the results

      if (currentQuestion === _questions.questions.length) {
        showResults();
        setTimeout(function () {
          // Remove class when the animation is done
          tr.classList.remove("form__transition");
        }, 1500);
      } else {
        // Check for correct answer, and sum needed scores
        if (selectedAnswer != null && selectedAnswer == correctAnswer) {
          tr.classList.remove("incorrect");
          tr.classList.add("correct");
          setCorrectAnswers(correctAnswers + 1);
        } else if (selectedAnswer != null && selectedAnswer != correctAnswer) {
          tr.classList.remove("correct");
          tr.classList.add("incorrect");
          setWrongAnswers(wrongAnswers + 1);
        }

        setTimeout(function () {
          // Remove class when the animation is done
          tr.classList.remove("form__transition");
          showQuestion();
        }, 1500);
      }
    });
  };

  var initSearch = function initSearch() {
    searchInp.addEventListener("keydown", function (e) {
      res = [];

      if (searchInp.value.length > 1) {
        _main.articles.data.forEach(function (article) {
          if (article.name.toLowerCase().includes(searchInp.value.toLowerCase())) {
            res.push(article);
          }
        });
      } else {
        res.push({
          name: "Escribe al menos 2 letras",
          url: "#"
        });
      }

      searchResults.innerHTML = "";
      res.forEach(function (article) {
        var item = document.createElement("section");
        item.className = "search-item";
        item.innerHTML = article.name;
        item.addEventListener("click", function () {
          window.location.href = "/".concat(article.url, ".html");
        });
        searchResults.appendChild(item);
      });

      if (e.keyCode === 13) {
        e.preventDefault();
        window.location.href = "/".concat(res[0].url, ".html");
      }
    });
  };

  var showAndHideSearch = function showAndHideSearch() {
    // Shows results and hide them depending the action, 
    // If the user clicks outside of the input, the results will be hidden
    // If the user clicks inside the input, the results will be shown
    searchInp.addEventListener("blur", function () {
      searchResults.innerHTML = "";
    });
    searchInp.addEventListener("click", function () {
      res.forEach(function (article) {
        var item = document.createElement("section");
        item.className = "search-item";
        item.innerHTML = article.name;
        item.addEventListener("click", function () {
          window.location.href = "/".concat(article.url, ".html");
        });
        searchResults.appendChild(item);
      });
    });
  };

  if (startBtn) {
    // If the button exists, run the function to add the event listener
    toggleTransition();
  }

  var assignLinksToLetters = function assignLinksToLetters() {
    var _loop = function _loop(i) {
      LTS[i].addEventListener("click", function () {
        window.location.href = window.location.href.replace("inicio", _main.urls[i]);
      });
    };

    // Assign the links to the letters
    for (var i = 0; i < LTS.length; i++) {
      _loop(i);
    }
  }; // Search scripts


  initSearch();
  showAndHideSearch(); // Links to letters

  assignLinksToLetters();
});