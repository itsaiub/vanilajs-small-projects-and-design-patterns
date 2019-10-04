import { http } from './http';
import { ui } from './ui';

const API_URL = `http://localhost:3000/posts`;

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

// listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

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
	const id = document.querySelector('#id').value;

	const data = { title, body };

	if (title !== '' || body !== '') {
		// check for id
		if (id === '') {
			// Create post
			http.post(API_URL, data)
				.then((data) => {
					ui.showAlert('Post Added', 'alert alert-success');
					ui.clearFields();
					getPosts();
				})
				.catch((err) => console.log(err));
		} else {
			// Update post
			http.put(`${API_URL}/${id}`, data)
				.then((data) => {
					ui.showAlert('Post Updated', 'alert alert-success');
					ui.changeFormState('add');
					getPosts();
				})
				.catch((err) => console.log(err));
		}
	} else {
		ui.showAlert('Please fill in all fields.', 'alert alert-danger');
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
	}
	e.preventDefault();
}

// Enable Edit State
function enableEdit(e) {
	if (e.target.parentElement.classList.contains('edit')) {
		const id = e.target.parentElement.dataset.id;
		const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
		const body = e.target.parentElement.previousElementSibling.textContent;

		const data = {
			id,
			title,
			body
		};

		ui.fillForm(data);
	}
	e.preventDefault();
}

// cancel edit state
function cancelEdit(e) {
	if (e.target.classList.contains('post-cancel')) {
		ui.changeFormState('add');
	}
	e.preventDefault();
}
