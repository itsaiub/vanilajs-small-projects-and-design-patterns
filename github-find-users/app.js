const copyRightYear = document.getElementById('cyear');
copyRightYear.textContent = new Date().getFullYear();

// Init Github
const github = new GitHub();

// Search Input
const searchUser = document.getElementById('searchUser');

// Search input event listenters
searchUser.addEventListener('keyup', (e) => {
	// get input text
	const userText = e.target.value;
	if (userText !== '') {
		// Make http call
		github.getUser(userText).then((data) => {
			if (data.profile.message === 'Not Found') {
				// show alert
			} else {
				// show profile
			}
		});
	} else {
		// clear profile
	}
});
