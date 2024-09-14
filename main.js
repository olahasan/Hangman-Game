// Audio and Video Elements
let correctAnswer = document.querySelector(".myAudioCorrectAnswer");
let wrongAnswer = document.querySelector(".myAudiowrongAnswer");
let myAudioGameOver = document.querySelector(".myAudioGameOver");
let myAudiocongratulations = document.querySelector(".myAudiocongratulations");
let myVideo = document.querySelector(".video-background");
let finshScreen = document.querySelector(".finish");
// Guess Container and Draw Element
let lettersGuessContainer = document.querySelector(".letters-guess");
let theDraw = document.querySelector(".hangman-draw");

// Game Variables
let wrongAttempts = 0;
let randomValueValue = "";

// Words Object
const words = {
  programming: ["html", "css", "cpp", "react", "mysql", "python"],
  movies: ["home alone", "big miracle", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "mark zuckerberg", "steve jobs"],
  countries: ["london", "United States", "germany", "Egypt", "italy"],
};

// Start the Game
startGame();

function startGame() {
  fillLettersIntoScreen();
  PreparePlacesToLetters();
  handleClickedLetters();
}

function fillLettersIntoScreen() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let lettersArray = Array.from(letters);
  let lettersContainer = document.querySelector(".letters");
  lettersArray.forEach((letter) => {
    createElement("span", "letter-box", letter, lettersContainer);
  });
}

function PreparePlacesToLetters() {
  let allKeys = Object.keys(words);
  console.log(allKeys);
  let randomPropNumber = Math.floor(Math.random() * allKeys.length);
  console.log(randomPropNumber);
  let randomPropName = allKeys[randomPropNumber];
  console.log(randomPropName);

  document.querySelector(".game-info .category span").innerHTML =
    randomPropName;
  let randomPropValue = words[randomPropName];
  console.log(randomPropValue);

  let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
  console.log(randomValueNumber);

  randomValueValue = randomPropValue[randomValueNumber];
  console.log(randomValueValue);

  let lettersAndSpace = Array.from(randomValueValue);
  console.log(lettersAndSpace);

  lettersAndSpace.forEach((letter) => {
    let className = letter === " " ? "with-space filled" : "";
    createElement("span", className, "", lettersGuessContainer);
  });
  // Update guessSpans after creating the spans
  guessSpans = document.querySelectorAll(".letters-guess span");
  console.log(guessSpans);
}

function handleClickedLetters() {
  document.addEventListener("click", (e) => {
    if (e.target.className === "letter-box") {
      e.target.classList.add("clicked");
      let theClickedLetter = e.target.innerHTML.toLowerCase();
      console.log(theClickedLetter);
      let theChosenWord = Array.from(randomValueValue.toLowerCase());
      console.log(theChosenWord);
      let theStatus = false; // Reset theStatus for each click
      console.log(theStatus);

      theChosenWord.forEach((wordLetter, WordIndex) => {
        console.log(wordLetter, WordIndex);
        if (theClickedLetter == wordLetter) {
          theStatus = true;
          guessSpans.forEach((span, spanIndex) => {
            console.log(span, spanIndex);
            if (WordIndex === spanIndex) {
              span.innerHTML = theClickedLetter;
              span.classList.add("filled");
            }
          });
        }
      });

      handleFalseStatus(theStatus);
    }
  });
}

function handleFalseStatus(theStatus) {
  if (!theStatus) {
    wrongAttempts++;
    theDraw.classList.add(`wrong-${wrongAttempts}`);
    playAudio(wrongAnswer);
  } else {
    playAudio(correctAnswer);
  }
  checkWinLose();
}

function checkWinLose() {
  if (wrongAttempts === 8) {
    lose();
    playAgain();
  } else if (allSpansHaveFilledClass()) {
    won();
    playAgain();
  }

  console.log(guessSpans.length);
  console.log(Array.from(guessSpans));
  let trueOrFalse = Array.from(guessSpans).every((span) =>
    span.classList.contains("filled")
  );
  console.log(trueOrFalse);
}

function lose() {
  createFinalScreen(
    "Game Over",
    "Do you want to play again?",
    "YES",
    "NO",
    randomValueValue
  );
  speak("Game Over");
  playAudio(myAudioGameOver);
  document.querySelector(".letters").classList.add("finished");
}

function won() {
  createFinalScreen(
    "Congratulations",
    "Do you want to play again?",
    "YES",
    "NO",
    ""
  );
  speak("Congratulations");
  playAudio(myAudiocongratulations);
  playVideo(myVideo);
  console.log("congrates");
}

function allSpansHaveFilledClass() {
  let trueOrFalse = Array.from(guessSpans).every((span) =>
    span.classList.contains("filled")
  );
  console.log("trueOrFalse = " + trueOrFalse);
  return trueOrFalse;
}

function createFinalScreen(title, question, btnYes, btnNo, correctAnswer) {
  finshScreen.classList.add("show");

  //whole card
  let theCard = document.createElement("div");
  theCard.className = "card";

  //title
  let theTitle = document.createElement("div");
  if (title === "Game Over") {
    theTitle.className = "title Game-Over";
  } else {
    theTitle.className = "title Congratulations";
  }
  // theTitle.className = "title";
  let theTitleText = document.createTextNode(title);
  theTitle.appendChild(theTitleText);

  //append the title into the card
  theCard.appendChild(theTitle);

  if (correctAnswer) {
    let theParagraph = createElement(
      "p",
      "rightanswer",
      `the right answer is `,
      theCard
    );

    let thePSpan = createElement(
      "span",
      "answer",
      ` ${correctAnswer} `,
      theParagraph
    );
  }

  //paagraph
  createElement("p", "question", question, theCard);

  //btns container
  let theBtnContainer = document.createElement("div");
  theBtnContainer.className = "btn-container";

  //yes button function
  let theBtnYes = createButton(btnYes, "btn-yes");

  //no button function
  let theBtnNo = createButton(btnNo, "btn-no");

  // append Btns Into thier Container function
  appendBtnsInContainer([theBtnYes, theBtnNo], theBtnContainer);

  theCard.appendChild(theBtnContainer);

  finshScreen.appendChild(theCard);
}

function createButton(text, className) {
  let btn = document.createElement("button");
  btn.className = className;
  let btnText = document.createTextNode(text);
  btn.appendChild(btnText);

  return btn;
}

function appendBtnsInContainer(buttons, theBtnContainer) {
  buttons.forEach((button) => {
    theBtnContainer.appendChild(button);
  });
}

function createElement(tag, className, textcontent, parent) {
  let element = document.createElement(tag);
  if (className) element.className = className;
  if (textcontent) element.textContent = textcontent;
  if (parent) parent.appendChild(element);
  return element;
}

function playAudio(audio) {
  audio.play();
}

function playVideo(video) {
  video.hidden = false;

  let startTime = 4.5;
  let endTime = 11.5;

  video.addEventListener("loadedmetadata", () => {
    video.currentTime = startTime;
    video.play();
  });

  video.addEventListener("timeupdate", () => {
    if (video.currentTime >= endTime) {
      video.pause();
    }
  });

  // Ensure the video starts playing from the start time
  if (video.readyState >= 1) {
    video.currentTime = startTime;
    video.play();
  }
}

function playAgain() {
  addEventListeners();
}

function addEventListeners() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-yes")) {
      handleYes();
    }

    if (e.target.classList.contains("btn-no")) {
      handleNo();
    }
  });
}

function handleYes() {
  location.reload();
}

function handleNo() {
  finshScreen.innerHTML = "";

  let p = document.createElement("p");
  p.className = "thanks";
  let pText = document.createTextNode("THANK YOU");
  p.appendChild(pText);

  finshScreen.appendChild(p);
}

// start to use google voice
function speak(text) {
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.voice = speechSynthesis
    .getVoices()
    .find((voice) => voice.name === "Google UK English Male"); // Change to desired voice
  speechSynthesis.speak(msg);
}

// Load voices
window.speechSynthesis.onvoiceschanged = function () {
  speechSynthesis.getVoices();
};
// end to use google voice
