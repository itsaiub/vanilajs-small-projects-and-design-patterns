const bookForm = document.getElementById('book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const isbn = document.querySelector('#isbn');
const bookList = document.querySelector('#book-list');

// * Book Constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// * UI Constructor
function UI() {}

// add book to the list
UI.prototype.addBookToList = function(book) {
	// create tr element
	const row = document.createElement('tr');
	// insert cols
	row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X</a></td>
  `;
	bookList.appendChild(row);
};

// clear fields
UI.prototype.clearFields = function() {
	title.value = '';
	author.value = '';
	isbn.value = '';
};

// show alert message
UI.prototype.showAlert = function(msg, className) {
	// create div
	const div = document.createElement('div');

	// add classes
	div.className = `alert ${className}`;

	// add text
	div.appendChild(document.createTextNode(msg));

	// get parent
	const container = document.querySelector('.container');
	// insert alert
	container.insertBefore(div, bookForm);

	// disappear alert after 3 seconds
	setTimeout(() => {
		document.querySelector('.alert').remove();
	}, 3000);
};

// delete book from list
UI.prototype.deleteBook = function(target) {
	if (target.classList.contains('delete')) {
		target.parentElement.parentElement.remove();
	}
};

// TODO: Event Listener for add Book
bookForm.addEventListener('submit', (e) => {
	// Instantiate book
	const book = new Book(title.value, author.value, isbn.value);

	// Instantiate UI
	const ui = new UI();

	// validate
	if (title.value === '' || author.value === '' || isbn.value === '') {
		// Error alert
		ui.showAlert('Please fill in all fields', 'error');
	} else {
		// add book to list
		ui.addBookToList(book);

		// show success
		ui.showAlert('Book Added', 'success');

		// clear input box
		ui.clearFields();
	}

	e.preventDefault();
});

// TODO: Event Listener for delete
bookList.addEventListener('click', (e) => {
	// instantiate
	const ui = new UI();

	// delete book
	ui.deleteBook(e.target);

	// show message
	ui.showAlert('Book Removed', 'success');

	e.preventDefault();
});
