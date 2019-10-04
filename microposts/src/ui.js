class UI {
	constructor() {
		this.postsEl = document.querySelector('#posts');
		this.titleEl = document.querySelector('#title');
		this.bodyEl = document.querySelector('#body');
		this.idEl = document.querySelector('#id');
		this.submitBtn = document.querySelector('.post-submit');
		this.formState = 'add';
	}

	showPosts(posts) {
		let output = '';

		posts.forEach((post) => {
			output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id='${post.id}'>
            <i class="fa fa-pencil"></i>
          </a>
          <a href="#" class="delete card-link" data-id='${post.id}'>
            <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
      `;
		});
		this.postsEl.innerHTML = output;
	}

	showAlert(msg, className) {
		this.clearAlert();
		const div = document.createElement('div');
		div.className = className;
		div.appendChild(document.createTextNode(msg));
		const container = document.querySelector('.postContainer');
		// const post = document.querySelector('#posts')
		container.insertBefore(div, this.postsEl);

		setTimeout(() => {
			this.clearAlert();
		}, 3000);
	}

	clearAlert() {
		const currentAlert = document.querySelector('.alert');
		if (currentAlert) {
			currentAlert.remove();
		}
	}

	clearFields() {
		this.titleEl.value = '';
		this.bodyEl.value = '';
	}

	fillForm(data) {
		this.titleEl.value = data.title;
		this.bodyEl.value = data.body;
		this.idEl.value = data.id;

		this.changeFormState('edit');
	}

	// clear id hidden value
	clearIdInput() {
		this.idEl.value = '';
	}

	changeFormState(type) {
		if (type === 'edit') {
			if (document.querySelector('.post-cancel')) {
				document.querySelector('.post-cancel').remove();
			}
			this.submitBtn.textContent = 'Update Post';
			this.submitBtn.className = 'post-submit btn btn-warning btn-block';
			// Create Cancel button
			const button = document.createElement('button');
			button.className = 'post-cancel btn btn-light btn-block';
			button.appendChild(document.createTextNode('Cancel Edit'));
			// Get parent
			const cardForm = document.querySelector('.card-form');
			// get element to insert before
			const formEnd = document.querySelector('.form-end');
			// insert cancel button
			cardForm.insertBefore(button, formEnd);
		} else {
			this.submitBtn.textContent = 'Post It';
			this.submitBtn.className = 'post-submit btn btn-primary btn-block';
			// remove cancel button
			if (document.querySelector('.post-cancel')) document.querySelector('.post-cancel').remove();
			this.clearIdInput();
			this.clearFields();
		}
	}
}

export const ui = new UI();
