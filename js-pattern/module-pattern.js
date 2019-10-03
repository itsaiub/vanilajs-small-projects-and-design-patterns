// Basic Structure
(function() {
	// declare private vars and functions

	return {
		// declare public vars and functions
	};
})();

/* Standard Module Pattern */
const UIController = (function() {
	let text = 'JS Module/Module Revealing Pattern';

	const changeText = () => {
		const el = document.querySelector('h1');
		el.textContent = text;
	};
	return {
		callChangeText: () => {
			changeText();
			console.log(text);
		}
	};
})();
UIController.callChangeText();
