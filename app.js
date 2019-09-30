// UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event Listeners
const loadEventListeners = () => {
	// DOM load event
	document.addEventListener('DOMContentLoaded', getTasks);
	// add task event
	form.addEventListener('submit', addTask);
	// remove task event
	taskList.addEventListener('click', removeTask);
	// clear all task event
	clearBtn.addEventListener('click', clearTasks);
	// filter task event
	filter.addEventListener('keyup', filterTask);
};

// Get tasks from local storage
const getTasks = () => {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach((task) => {
		// create li element
		const li = document.createElement('li');
		// add class
		li.className = 'collection-item';
		// create text node and append to li element
		li.appendChild(document.createTextNode(task));
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
	});
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
	// store in local storage
	storeLocalStorage(taskInput.value);
	// clear input
	taskInput.value = '';
};

// store local storage task
const storeLocalStorage = (task) => {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Remove Task
const removeTask = (e) => {
	if (e.target.parentElement.classList.contains('delete-item')) {
		const taskItem = e.target.parentElement.parentElement;
		if (confirm('Are you sure?')) {
			taskItem.remove();
			// remove from local storage
			removeTaskFromLocalStorage(taskItem);
		}
	}
};

// remove from local storage
const removeTaskFromLocalStorage = (taskItem) => {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach((task, index) => {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
};

// clear all tasks
const clearTasks = (e) => {
	// taskList.innerHTML = '';

	// Faster Method
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// clear from localStorage
	clearTasksFromLocalStorage();
};

const clearTasksFromLocalStorage = () => {
	localStorage.clear();
};

// Filter task
const filterTask = (e) => {
	const text = e.target.value.toLowerCase();
	const tasks = document.querySelectorAll('.collection-item');

	tasks.forEach((task) => {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) !== -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
};
loadEventListeners();
