function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

(function () {
  function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
        );
      }

      output.push(
        `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;

        answerContainers[questionNumber].style.color = "green";
      } else {
        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "Skalbaggar hjälper till att pollinera",
      answers: {
        a: "Sant",
        b: "Falskt",
      },
      correctAnswer: "a",
    },
    {
      question:
        "Det som sticker upp ovanför jorden på en potatisplanta kallas stamknöl",
      answers: {
        a: "Sant",
        b: "Falskt",
      },
      correctAnswer: "b",
    },
    {
      question: "Grisar älskar att böka med sina trynen i jorden.",
      answers: {
        a: "Sant",
        b: "Falskt",
      },
      correctAnswer: "a",
    },
    {
      question: "Vem är kung i Sverige?",
      answers: {
        a: "Carl XVI Gustaf",
        b: "David Hasselhoff",
        c: "Karl XII",
      },
      correctAnswer: "a",
    },
    {
      question: "Vad är den kemiska formlen för vatten?",
      answers: {
        a: "C12H22011",
        b: "H20",
        c: "HCI",
      },
      correctAnswer: "b",
    },
    {
      question: "Vilken stad är Sveriges huvudstad?",
      answers: {
        a: "Helsingborg",
        b: "Malmö",
        c: "Stockholm",
      },
      correctAnswer: "c",
    },
    {
      question: "Olika namn för lucifer?",
      answers: {
        a: "Satan",
        b: "Morgon stjärna",
        c: "Dracula",
        d: "Petter",
      },
      correctAnswer: "a",
    },
  ];

  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(currentSlide);

  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
