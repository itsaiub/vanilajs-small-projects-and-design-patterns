// UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event Listeners
const loadEventListeners = () => {
	// add task event
	form.addEventListener('submit', addTask);
	// remove task event
	taskList.addEventListener('click', removeTask);
	// clear all task event
	clearBtn.addEventListener('click', clearTasks);
	// filter task event
	filter.addEventListener('keyup', filterTask);
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

// Remove Task
const removeTask = (e) => {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();
		}
	}
};

// clear all tasks
const clearTasks = (e) => {
	// taskList.innerHTML = '';

	// Faster Method
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
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
