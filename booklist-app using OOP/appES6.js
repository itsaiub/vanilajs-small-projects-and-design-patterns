const bookForm = document.getElementById('book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const isbn = document.querySelector('#isbn');
const bookList = document.querySelector('#book-list');

class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
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
	}
	showAlert(msg, className) {
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
	}
	deleteBook(target) {
		if (target.classList.contains('delete')) {
			target.parentElement.parentElement.remove();
		}
	}
	clearFields() {
		title.value = '';
		author.value = '';
		isbn.value = '';
	}
}

// Local Storage Class
class Store {
	static getBooks() {
		let books;
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}

	static displayBooks() {
		const books = Store.getBooks();
		books.forEach((book) => {
			const ui = new UI();
			ui.addBookToList(book);
		});
	}

	static addBook(book) {
		const books = Store.getBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}
	static removeBooks(isbn) {
		console.log(isbn);
		const books = Store.getBooks();
		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});
		localStorage.setItem('books', JSON.stringify(books));
	}
}

// TODO: DOM EVENT Loaded
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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

		// add to localStorage
		Store.addBook(book);

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

	// remove from localStorage
	Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);

	// show message
	ui.showAlert('Book Removed', 'success');

	e.preventDefault();
});
