"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
const scores = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `src/dice-${dice}.png`;
    // 3. Check for rolled 1: if ture, switch to next player
    if (dice !== 1) {
      //   add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   switch to other player
      switchPlayer();
    }
  }
});

// button hold
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active players global score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Chech if players global score => 100
    if (scores[activePlayer] >= 10) {
      //   fihish the game or
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      // switch to another player
      switchPlayer();
    }
  }
});

// BTN new game
btnNew.addEventListener("click", function () {
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  currentScore = 0;
  activePlayer = 0;
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
    document.querySelector(`#score--${i}`).textContent = scores[i];
    document.querySelector(`#current--${i}`).textContent = scores[i];
  }
});
