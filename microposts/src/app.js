import { http } from './http';
import { ui } from './ui';

const API_URL = `http://localhost:3000/posts`;

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

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

// Delete Post
function deletePost(e) {
	if (e.target.parentElement.classList.contains('delete')) {
		const id = e.target.parentElement.dataset.id;
		if (confirm('Are you sure?')) {
			http.delete(`${API_URL}/${id}`)
				.then((data) => {
					ui.showAlert('Post Removed', 'alert alert-success');
					getPosts();
				})
				.catch((err) => {
					ui.showAlert('Error to post delete.', 'alert alert-danger');
				});
		}
		console.log(id);
	}
	e.preventDefault();
}
