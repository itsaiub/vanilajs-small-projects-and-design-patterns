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
	}
}

export const ui = new UI();
