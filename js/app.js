/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/* ADDED BY MOSES AJIRELOJA */

// Store all cards in an array

let deck = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];

// Shuffle list of cards using the provided shuffle function.

deck = shuffle(deck);

// Define array for card list
let cardList = [];

// Define array for card index
let cardIndex = [];

// Define move counter
let moves = 0;

// Total Matched Cards
let totalMatched = 0;

// Obtain moves display field
let showMoves = document.querySelector('.moves');

// Obtain star rating and set number of stars
let stars = document.querySelector('.stars');

// Set stars that will be displayed later
let oneStar = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star-o"></i></li>
        		<li><i class="fa fa-star-o"></i></li>`;

let twoStars = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star-o"></i></li>`;

let threeStars = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;

// Define time variables
let seconds = 0;
let minutes = 0;
let timeCounter;

// Store timer in a variable
let showTimer = document.querySelector('.show-timer');

// Define first click
let firstClick = false;


// Timer
function timer() {
	seconds++;
	if (seconds == 60) {
		seconds = 0;
		minutes++;
	}
	// Format seconds
	seconds > 9 ? showsecs = seconds : showsecs = "0" + seconds;

	// Format minutes
	minutes > 9 ? showmins = minutes : showmins = "0" + minutes;

	showTimer.textContent = `${showmins}:${showsecs}`;

	timeKeeper();
}


function timeKeeper() {
	timeCounter = setTimeout(timer, 1000);
}


// Populate the deck with the shuffled cards

let getCard = document.querySelectorAll('.fa');

	for (let i=0, j=4; i<16, j<getCard.length; i++, j++) {

	getCard[j].classList.add(deck[i]);

	}

// Obtain the card class
let cardBox = document.querySelectorAll('.card');

for (let i=0; i<cardBox.length; i++) {

		// Set up click event
		cardBox[i].addEventListener('click', function() {

			// Start timer
			if (firstClick === false) {
				timer();
			}

			firstClick = true;

			// Do not perform any action if card is matched
			if (cardBox[i].classList.contains("match")) {

			// do nothing
			} else {

					// Open the card
					openCard(cardBox[i]);

					// Get the name of the card
					let getCardName = cardBox[i].firstElementChild.classList;

					// Add card name to the list of opened cards
					openedCardList(getCardName);

					// Check out matched cards
					doMatching();
				  }

		});

	}

function doMatching() {
			// Check for matched cards
		if (cardList.length === 2) {
		let firstCard = cardList[0].value;
		let secondCard = cardList[1].value;

		if (firstCard === secondCard) {

			moveCounter();

			totalMatched = (totalMatched + 1);

			updateStars();

			lockMatched();

			if (totalMatched === 8) { // End Game
				if (stars.innerHTML === oneStar)
				{
					numStar = 1;
				}
				else if (stars.innerHTML === twoStars) {
					numStar = 2;
				}
				else {
					numStar = 3;
				}

				alert(`Congratulations! \nYou have finished the game with ${moves} moves in ${minutes} minute(s) and ${seconds} second(s).\nYour Star(s): ${numStar} \nPlay again!`);
				location.reload();
			}

		} else {

			moveCounter();

			// Update star rating
			updateStars();

			// Delay for 0.5 second
			setTimeout(function () {
				// close card
				closeUnmatched();

			}, 500);

		}
	}

}


function openedCardList(card) {
	// If the card list is empty, add a new card
	if (cardList.length === 0 ) {
	cardList.push(card);
	}

	// Check existing card first.
	if (cardList.length === 1 ) {
		let oldCard = cardList[0];
		let newCard = card;
		if (oldCard === newCard)
		{
			// do nothing.
		}
		else
		{
			cardList.push(card);
		}

	}

	else {
		cardList = [];
		cardList.push(card);
	}
}


// Match cards
function matchCard(card) {

		if (card.classList.contains('open', 'show')) {
			card.classList.remove('open', 'show');
		}

		card.classList.add('match');
}


// Open card
function openCard(card) {
		card.classList.add('open', 'show');
}

// Close card
function closeCard(card) {
		card.classList.remove('open', 'show');
}


// Toggle card
function toggleCard(card) {

		if (card.classList.contains('open', 'show'))

		{
			card.classList.remove('open', 'show');
		}
		else
		{
			card.classList.add('open', 'show');
		}
}


// Restart Game
let restart = document.querySelector('.restart');

restart.addEventListener('click', function() {
	location.reload();
});


// Move counter and display on page
function moveCounter() {

	moves = (moves + 1);

	showMoves.innerText = moves;
}


// Update stars
function updateStars() {

	if (moves === 13) {
		stars.innerHTML = twoStars;
	}

	if (moves === 21) {
		stars.innerHTML = oneStar;
	}
}


// Close unmatched card
function closeUnmatched() {

		for (let i=0; i<16; i++) {
		if (cardBox[i].classList.contains('open', 'show'))
		{
			closeCard(cardBox[i]);
		}
	}
}


// Lock matched card
function lockMatched() {

	for (let i=0; i<16; i++) {
		if (cardBox[i].classList.contains('open', 'show'))
		{
			closeCard(cardBox[i]);
			matchCard(cardBox[i]);
		}
	}
}