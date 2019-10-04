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
}

export const ui = new UI();
