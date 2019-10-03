// Form Blur event listeners
const nameEl = document.getElementById('name');
const postEl = document.getElementById('postcode');
const emailEl = document.getElementById('email');
const phoneEl = document.getElementById('phone');

nameEl.addEventListener('blur', validateName);
postEl.addEventListener('blur', validatePostCode);
emailEl.addEventListener('blur', validateEmail);
phoneEl.addEventListener('blur', validatePhone);

function validateName(e) {
	const nameValue = nameEl.value;
	const re = /^[a-zA-Z]{2,10}$/i;

	if (!re.test(nameValue)) {
		nameEl.classList.add('is-invalid');
	} else {
		nameEl.classList.remove('is-invalid');
	}
}
function validatePostCode() {
	const postValue = postEl.value;
	/* to validate 3333 or 3333-4222 
  const re = /^[0-9]{4}(-[0-9]{4})?$/; */
	// to validate 3443 or +3424
	const re = /^\+?[0-9]{4}$/;

	if (!re.test(postValue)) {
		postEl.classList.add('is-invalid');
	} else {
		postEl.classList.remove('is-invalid');
	}
}
function validateEmail() {
	const emailValue = emailEl.value;
	const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

	if (!re.test(emailValue)) {
		emailEl.classList.add('is-invalid');
	} else {
		emailEl.classList.remove('is-invalid');
	}
}
function validatePhone() {
	const phoneValue = phoneEl.value;
	const re = /^(\(?\+?\d{2}\)?)?[-. ]?0\d{4}[-. ]?\d{6}$/;

	if (!re.test(phoneValue)) {
		phoneEl.classList.add('is-invalid');
	} else {
		phoneEl.classList.remove('is-invalid');
	}
}
