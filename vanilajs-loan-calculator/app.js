const loanForm = document.querySelector('#loan-form');
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');

const calculateResults = (e) => {
	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayment = parseFloat(years.value) * 12;
	amount.value = '';
	interest.value = '';
	years.value = '';
	// compute monthly payment
	const x = Math.pow(1 + calculatedInterest, calculatedPayment);
	const monthly = (principal * x * calculatedInterest) / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayment).toFixed(2);
		totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);
	} else {
		showError('Please check your numbers..');
	}

	e.preventDefault();
};

const showError = (error) => {
	// create div
	const errorDiv = document.createElement('div');

	// get elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	// add class
	errorDiv.className = 'alert alert-danger';

	// create text node and append to div
	errorDiv.appendChild(document.createTextNode(error));

	// insert error above heading
	card.insertBefore(errorDiv, heading);
	// clear error after 3 seconds
	setTimeout(clearError, 3000);
};

// clear error
const clearError = () => {
	document.querySelector('.alert').remove();
};

loanForm.addEventListener('submit', calculateResults);
