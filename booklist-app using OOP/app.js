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

UI.prototype.addBookToList = function(book) {
	console.log(book);
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

UI.prototype.clearFields = function() {
	title.value = '';
	author.value = '';
	isbn.value = '';
};

// ? Event Listeners
bookForm.addEventListener('submit', (e) => {
	// Instantiate book
	const book = new Book(title.value, author.value, isbn.value);

	// Instantiate UI
	const ui = new UI();
	console.log(ui);

	// add book to list
	ui.addBookToList(book);

	// clear input box
	ui.clearFields();

	e.preventDefault();
});
