import { http } from './http';
import { ui } from './ui';

const API_URL = `http://localhost:3000/posts`;

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Get Post
function getPosts() {
	http.get(API_URL)
		.then((data) => {
			ui.showPosts(data);
		})
		.catch((err) => {
			console.log(err);
		});
}

// Submit Post
function submitPost() {
	const title = document.querySelector('#title').value.trim();
	const body = document.querySelector('#body').value.trim();

	const data = { title, body };

	if (title !== '' && body !== '') {
		http.post(API_URL, data)
			.then((data) => {
				ui.showAlert('Post Added', 'alert alert-success');
				ui.clearFields();
				getPosts();
			})
			.catch((err) => console.log(err));
	} else {
		ui.showAlert("Post or Title shouldn't be empty.", 'alert alert-danger');
	}
}
