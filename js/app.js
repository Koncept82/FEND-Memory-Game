// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * Create a list that holds all of your cards
 */

const icons = ['fa fa-diamond', 'fa fa-diamond',
    'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
    'fa fa-anchor', 'fa fa-anchor',
    'fa fa-bolt', 'fa fa-bolt',
    'fa fa-cube', 'fa fa-cube',
    'fa fa-bicycle', 'fa fa-bicycle',
    'fa fa-leaf', 'fa fa-leaf',
    'fa fa-bomb', 'fa fa-bomb',
];

const cardsContainer = document.querySelector('.deck');

let openedCards = [];
let matchedCards = [];

const modal = document.querySelector('.modal');



// Initialize the game

function init() {

    // Shuffle Cards
    shuffle(icons);

    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);

        // Add click event to each card
        click(card);
    }

}

// Click Event

let isFirstClick = true;

function click(card) {

    // Card Click Event
    card.addEventListener('click', function() {

        if (isFirstClick) {
            startTimer();
            isFirstClick = false;
        }

        const currentCard = this;
        const previousCard = openedCards[0];

        if (openedCards.length < 2) {

            card.classList.add('open', 'show', 'disable');
            openedCards.push(this);

            if (openedCards.length > 1) {
                //Compare 2 opened cards
                compare(currentCard, previousCard);
            }

        } else if (openedCards.length > 1) {
            card.classList.remove('open', 'show', 'disable');
            openedCards = [];
        }


    });
}

// Compare the 2 cards 

function compare(currentCard, previousCard) {

    if (currentCard.innerHTML === previousCard.innerHTML) {

        //Matched
        currentCard.classList.add('match');
        previousCard.classList.add('match');

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        //If game is over
        isOver();

    } else {

        setTimeout(function() {
            currentCard.classList.remove('open', 'show', 'disable');
            previousCard.classList.remove('open', 'show', 'disable');
            openedCards = [];
        }, 500);

    }

    // Add new move
    addMove();
}


// Check if the game is over

function isOver() {
    if (matchedCards.length === icons.length) {
        stopTimer();

        gameOverMessage();

        //alert("YOU WIN!");
    }
}

// Game over Message

function gameOverMessage() {

    //Display Modal
    modal.style.top = "0";

    // Modal Rating
    let rating = document.querySelector('.rating');
    rating.innerHTML = starsContainer.innerHTML;

    // Modal Time
    let time = document.querySelector('.totalSeconds');
    time.innerHTML = timerContainer.innerHTML;

    //Modal Moves
    let move = document.querySelector('.total_moves');
    move.innerHTML = parseInt(movesContainer.innerHTML) + 1;

}

// Play Again Button

let playAgain = document.querySelector('.play-again');
playAgain.addEventListener('click', function() {

    //Hide the Modal
    modal.style.top = "-150%";
    restart();

});

/// Start the game for the first time
init();

// Rating

const starsContainer = document.querySelector('.stars');
const star = `<li><i class="fa fa-star"></i></li>`

function rating() {
    if (moves < 10) {
        starsContainer.innerHTML = star + star + star;
    } else if (moves < 15) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}

// Timer 

const timerContainer = document.querySelector('.timer');
let liveTimer,
    totalSeconds = 0;

timerContainer.innerHTML = totalSeconds + ' Secs';

function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalSeconds + ' Secs';
    }, 1000);
}

function stopTimer() {
    clearInterval(liveTimer);
}


// Restart Button

function restart() {
    // Delete All Cards
    cardsContainer.innerHTML = "";

    // Call Init to create new cards
    init();

    // Reset any related variables
    openedCards = [];
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;

    // Reset Rating
    starsContainer.innerHTML = star + star + star;

    // Reset Timer

    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + ' Secs';
}
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener('click', function() {

    restart();

});


// Add move
const movesContainer = document.querySelector('.moves');
let moves = 0;
movesContainer.innerHTML = 0;

function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    // Set Rating
    rating();
}




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




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