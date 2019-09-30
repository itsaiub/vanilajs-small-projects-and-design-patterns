// UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event Listeners
const loadEventListeners = () => {
	form.addEventListener('submit', addTask);
};

// Add Task
const addTask = (e) => {
	e.preventDefault();

	if (taskInput.value === '') {
		alert('Add a task');
	}

	// create li element
	const li = document.createElement('li');
	// add class
	li.className = 'collection-item';
	// create text node and append to li element
	li.appendChild(document.createTextNode(taskInput.value));
	// create new link element
	const link = document.createElement('a');
	// add class
	link.className = 'delete-item secondary-content';
	// add icon html
	link.innerHTML = `<i class="fa fa-times"></i>`;
	// append the link to li
	li.appendChild(link);
	// append li to ui
	taskList.appendChild(li);
	// clear input
	taskInput.value = '';
};

loadEventListeners();
