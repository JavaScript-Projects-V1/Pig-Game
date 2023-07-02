"use strict";

// show the winner
function winner(id) {
  !id
    ? player0.classList.add("player--winner")
    : player1.classList.add("player--winner");
  dice.classList.add("hidden");
  playing = false;
}

// Update the score of the player
const updateScore = function (id) {
  if (!id) {
    // update his total score content on screen
    playerOne.textContent = totalOne;
    // reset 1st player current score
    playerOneScore = 0;
    currentPlayerOne.textContent = playerOneScore;
  } else {
    // update his total score content on screen
    playerTwo.textContent = totalTwo;
    // reset 2nd player current score
    playerTwoScore = 0;
    currentPlayerTwo.textContent = playerTwoScore;
  }
};

// Activate the player
const activatePlayer = function (id) {
  // toggle the flag as we activate another player
  f ^= 1;

  // activate the player based on his id
  if (id) {
    // activate the 2nd player
    player0.classList.remove("player--active");
    player1.classList.add("player--active");
  } else {
    // activate the 1st player
    player1.classList.remove("player--active");
    player0.classList.add("player--active");
  }
};

// Handling the rolling Dice
function handlingDice() {
  if (playing) {
    // Generate a random dice number (1 -> 6)
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    // display image based on dice number
    dice.src = `Images/dice-${diceNumber}.png`;
    // display the rolling dice image
    dice.classList.remove("hidden");
    if (!f) {
      // must switch to 2nd player
      if (diceNumber === 1) playerOneScore = 0;
      // increase the current score
      else playerOneScore += diceNumber;
      // update the content of current score
      currentPlayerOne.textContent = playerOneScore;
    } else {
      // must switch to 1st player
      if (diceNumber === 1) playerTwoScore = 0;
      // increase the current score
      else playerTwoScore += diceNumber;
      // update the content of current score
      currentPlayerTwo.textContent = playerTwoScore;
    }
    if (diceNumber === 1) {
      // falsify hold flag as we don't hold
      // one of players make a dice Number = 1
      holdFlage = false;
      // Switch to the other player
      switchPlayer();
    }
  }
}

// Handling switch between players
function switchPlayer() {
  if (playing) {
    if (holdFlage) {
      // check if the 1st player is active
      if (player0.classList.contains("player--active")) {
        // update his total score
        totalOne += playerOneScore;
        // check if the 1st player wins
        if (totalOne >= 100) {
          // update his total score content on screen
          playerOne.textContent = totalOne;
          winner(0);
        } else {
          // activate the 2nd player
          activatePlayer(1);
          updateScore(0);
        }
      } else {
        // update his total score
        totalTwo += playerTwoScore;
        // check if the 2nd player wins
        if (totalTwo >= 100) {
          // update his total score content on screen
          playerTwo.textContent = totalTwo;
          winner(1);
        } else {
          // activate the 1st player
          activatePlayer(0);
          updateScore(1);
        }
      }
    } else {
      // if f=0 activate player one and othewise
      activatePlayer(!f);
      // f will be toggled from the above func
      // if f=1 update player one and vice versa
      updateScore(!f);
    }
    // set the hold flag to true as it was
    holdFlage = true;
  }
}

// Reset the Game (start a new Game)
function resetGame() {
  totalOne = totalTwo = playerOneScore = playerTwoScore = 0;
  playerOne.textContent = 0;
  currentPlayerOne.textContent = 0;
  playerTwo.textContent = 0;
  currentPlayerTwo.textContent = 0;
  dice.classList.add("hidden");
  activatePlayer(0);
  playing = true;
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
}

let totalOne = 0;
let totalTwo = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let f = false;
let holdFlage = true;
let playing = true;

const dice = document.querySelector(".dice");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const currentPlayerOne = document.querySelector("#current--0");
const currentPlayerTwo = document.querySelector("#current--1");
const playerOne = document.querySelector("#score--0");
const playerTwo = document.querySelector("#score--1");
const newGame = document.querySelector(".btn--new");

dice.classList.add("hidden");
rollDice.addEventListener("click", handlingDice);
hold.addEventListener("click", switchPlayer);
newGame.addEventListener("click", resetGame);
