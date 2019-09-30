/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// * Game values
let min = 1,
	max = 10,
	winningNum = 2,
	guessesLeft = 3;

// * UI elements
const gameWrapper = document.querySelector('#game'),
	minNum = document.querySelector('.min-num'),
	maxNum = document.querySelector('.max-num'),
	gusessBtn = document.querySelector('#guess-btn'),
	guessInput = document.querySelector('#guess-input'),
	message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
gameWrapper.addEventListener('mousedown', (e) => {
	if (e.target.classList.contains('play-again')) {
		window.location.reload();
	}
});

// listen for guess
gusessBtn.addEventListener('click', () => {
	let guess = parseInt(guessInput.value);
	// validate
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	// check if won
	if (guess === winningNum) {
		// game over - won
		gameOver(true, `${winningNum} is correct, YOU WIN!`);
	} else {
		// wrong number
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			// Game over - lost
			gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
		} else {
			// game continues - answer wrong
			// change border color
			guessInput.style.borderColor = 'red';
			guessInput.value = '';

			// set message
			setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
		}
	}
});

// game over
const gameOver = (won, msg) => {
	let color = won === true ? 'green' : 'red';
	// disable input
	guessInput.disabled = true;
	// change border color
	guessInput.style.borderColor = color;
	// set message
	setMessage(msg, color);

	// play agin
	gusessBtn.value = 'Play Again';
	gusessBtn.className += 'play-again';
};

// set message
const setMessage = (msg, color) => {
	message.style.color = color;
	message.textContent = msg;
};
