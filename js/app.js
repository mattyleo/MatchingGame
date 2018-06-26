/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Create a list that holds all of your cards
const images = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube",
"fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

//create the container for the cards.

const cardsContainer = document.querySelector(".deck");

// create an empty array that will store the open card

let openedCards = [];

let matchedCards = [];

//Initialize the game and create a loop that will list from all the array of images to create the cards.
function initGame() {
  var cards = shuffle(images);
  for (let i = 0; i < images.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML=`<i class="${images[i]}"></i>`;
    cardsContainer.appendChild(card);

    // each cards have a click events

    click(card);
  }

}

// when the first card will be clicked the time will start
let firstClick = true;

// card event on click show images.
function click(card) {
  card.addEventListener("click", function() {
    if(firstClick) {
      // Start our timer
      startTimer();
      // Change our First Click indicator's value
      firstClick = false;
}
    const currentCard = this;
    const previousCard = openedCards[0];

    //let's check if there are any items inside the opencards array
    if (openedCards.length === 1) {

      card.classList.add("open", "show", "disable");
      openedCards.push(this);

      //let's compare 2 cards open in this array if are equal
      compare(currentCard, previousCard);

          setTimeout(function() {
            itsOver();
          }, 300);

    } else {
      // no any open cards
      currentCard.classList.add("open","show", "disable");
      openedCards.push(this);
    }
    /*testing if the function is returning the names of the images.
    console.log(card.innerHtml); */

  });

}

//compare the 2 cards choosen to see if they match
function compare(currentCard, previousCard) {
  if(currentCard.innerHTML === previousCard.innerHTML) {

    // Match cards
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCards.push(currentCard, previousCard);

    openedCards = [];

    // Check if all the cards are checked

  } else {

    // set a timeout function to show the incorrect match
    setTimeout (function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
      openedCards = [];
    }, 400 );

  }

  //Count error moves
  addMove();

}

// Move count
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;

  // Set the stars
  points();
}

// Initializing rating stars

const starsContainer = document.querySelector(".stars");
const stars = `<li><i class="fa fa-star"></i></li>`;
var ranking = 3;
starsContainer.innerHTML = stars + stars + stars;
function points() {
  switch (moves) {
    case 12:
    ranking = 2;
    starsContainer.innerHTML = stars + stars;
    break;
    case 25:
    ranking = 1;
    starsContainer.innerHTML = stars;
    break;
  }
  return {score: ranking}
};

// The game will pop up an alert message when all the cards match and stop the timer
function itsOver() {
  if(matchedCards.length === images.length) {

    // Stop the timer
        stopTimer();

        replayAbility();

  }
};


// Initialize the timer
const timerContainer = document.querySelector(".timer");
let currentTimer,
    totalSeconds = 0;

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + 'sec';

function startTimer() {
  currentTimer = setInterval(function() {
    // Increase the totalSeconds by 1
    totalSeconds++;
    // Update the HTML Container with the new time
    timerContainer.innerHTML = totalSeconds + 'sec';
    }, 1000);
}

// initialiaze the stop timer when the game will be complete
function stopTimer() {
    clearInterval(currentTimer);
}

// Initialize the restart bottom to restart the game

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
replay();
});

function replayAbility() {
      alert("Congratulations You did it!!!! \n" + "You complete the game in " +
       totalSeconds + " seconds" + " with a total of " + moves +
        " moves" + " and a ranking equal to: " + ranking + " Stars");
      //window.confirm("Would you like to tray one more time?");
        replay();
}

// restart at completition
function replay() {
  //cancell all the cardsContainer
  cardsContainer.innerHTML = "";

  //restart the game
  initGame();

  //reset the array keeping all the matched cards
  matchedCards = [];

  // reset move
  moves = 0;
  movesContainer.innerHTML = 0;

  //reset the star points
  starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;

  // reset the timer
  stopTimer();
      firstClick = true;
      totalSeconds = 0;
      timerContainer.innerHTML = totalSeconds + "sec";

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Starting the game
initGame();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
