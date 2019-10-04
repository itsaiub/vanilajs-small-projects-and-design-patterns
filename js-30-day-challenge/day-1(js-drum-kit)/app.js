window.addEventListener('keydown', playSound);

function playSound(e) {
	const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
	const key = document.querySelector(`.key[data-key='${e.keyCode}']`);
	// stop the function if keyCode not found
	if (!audio) return;
	// rewind to start
	audio.currentTime = 0;
	// play the audio
	audio.play();
	// adding the class
	key.classList.add('playing');
}
// select all keys
const keys = document.querySelectorAll('.key');
// loop through the nodelist
keys.forEach((key) => {
	key.addEventListener('transitionend', removeTransition);
});

function removeTransition(e) {
	// skip if its not transform
	if (e.propertyName !== 'transform') return;
	// remove class from element
	this.classList.remove('playing');
}
