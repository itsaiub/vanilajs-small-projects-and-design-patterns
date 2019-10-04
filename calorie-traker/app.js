// Storage Controller

// Item Controller
const ItemCtrl = (function() {
	// Item Constructor
	const Item = function(id, name, calories) {
		this.id = id;
		this.name = name;
		this.calories = calories;
	};

	// Data Structure / State
	const data = {
		items: [
			// { id: 0, name: 'Eggs', calories: 300 },
			// { id: 1, name: 'Chicken', calories: 500 },
			// { id: 2, name: 'Meat', calories: 400 }
		],
		currentItem: null,
		totalCalories: 0
	};

	// Public Methods
	return {
		getItems: () => {
			return data.items;
		},

		addItem: (name, calories) => {
			let ID;
			// create ID
			if (data.items.length > 0) {
				ID = data.items[data.items.length - 1].id + 1;
			} else {
				ID = 0;
			}
			// calories to number
			calories = parseInt(calories);

			// Create new Item
			newItem = new Item(ID, name, calories);

			// Add to items
			data.items.push(newItem);

			return newItem;
		},

		getItemById: (id) => {
			let found = null;
			data.items.forEach((item) => {
				if (item.id === id) {
					found = item;
				}
			});
			return found;
		},

		setCurrentItem: (item) => {
			data.currentItem = item;
		},

		getCurrentItem: () => {
			return data.currentItem;
		},

		getTotalCalories: () => {
			let total = 0;
			data.items.forEach((item) => {
				total += item.calories;
			});
			data.totalCalories = total;
			return total;
		},

		logData: () => {
			return data;
		}
	};
})();

// UI Controller
const UICtrl = (function() {
	const UISelectors = {
		itemList: '#item-list',
		addBtn: '.add-btn',
		updateBtn: '.update-btn',
		deleteBtn: '.delete-btn',
		backBtn: '.back-btn',
		itemName: '#item-name',
		itemCalories: '#item-calories',
		totalCalories: '.total-calories'
	};

	// Public Methods
	return {
		populateItemList: (items) => {
			let html = '';
			items.forEach((item) => {
				html += `<li class="collection-item" id="item-${item.id}">
					<strong>${item.name}: </strong> <em>${item.calories} Callories</em>
					<a href="#" class="secondary-content">
						<i class="edit-item fa fa-pencil"></i>
					</a>
				</li>`;
			});

			// insert list items
			document.querySelector(UISelectors.itemList).innerHTML = html;
		},

		getItemInput: () => {
			return {
				name: document.querySelector(UISelectors.itemName).value.trim(),
				calories: document.querySelector(UISelectors.itemCalories).value.trim()
			};
		},
		addListItem: (item) => {
			// show the list
			document.querySelector(UISelectors.itemList).style.display = 'block';
			// create li element
			const li = document.createElement('li');
			// add class
			li.className = 'collection-item';
			// add id
			li.id = `item-${item.id}`;
			// add html
			li.innerHTML = `
					<strong>${item.name}: </strong> <em>${item.calories} Callories</em>
					<a href="#" class="secondary-content">
						<i class="edit-item fa fa-pencil"></i>
          </a>`;
			// insert item
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
		},
		clearInput: () => {
			document.querySelector(UISelectors.itemName).value = '';
			document.querySelector(UISelectors.itemCalories).value = '';
		},
		addItemToForm: () => {
			console.log(ItemCtrl.getCurrentItem().name);
			document.querySelector(UISelectors.itemName).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(UISelectors.itemCalories).value = ItemCtrl.getCurrentItem().calories;
			UICtrl.showEditState();
		},
		hideList: () => {
			document.querySelector(UISelectors.itemList).style.display = 'none';
		},
		showTotalCalories: (totalCal) => {
			document.querySelector(UISelectors.totalCalories).textContent = totalCal;
		},
		clearEditState: () => {
			UICtrl.clearInput();
			document.querySelector(UISelectors.updateBtn).style.display = 'none';
			document.querySelector(UISelectors.deleteBtn).style.display = 'none';
			document.querySelector(UISelectors.backBtn).style.display = 'none';
			document.querySelector(UISelectors.addBtn).style.display = 'inline';
		},
		showEditState: () => {
			document.querySelector(UISelectors.updateBtn).style.display = 'inline';
			document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
			document.querySelector(UISelectors.backBtn).style.display = 'inline';
			document.querySelector(UISelectors.addBtn).style.display = 'none';
		},
		getSelectors: () => {
			return UISelectors;
		}
	};
})();

// App Controller
const AppCtrl = (function(ItemCtrl, UICtrl) {
	// Load Event Listeners
	const loadEventListeners = function() {
		const UISelectors = UICtrl.getSelectors();

		// Add item event
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

		// Edit icon click event
		document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
	};

	// Add item submit
	const itemAddSubmit = (e) => {
		console.log('added');
		// Get form input from UI controller
		const input = UICtrl.getItemInput();

		// check for name and calorie input
		if (input.name !== '' && input.calories !== '') {
			// Add Item
			const newItem = ItemCtrl.addItem(input.name, input.calories);

			// Add Item to UI list
			UICtrl.addListItem(newItem);

			// get totoal calories
			const totalCalories = ItemCtrl.getTotalCalories();

			// add total calories to UI
			UICtrl.showTotalCalories(totalCalories);

			// clear fields
			UICtrl.clearInput();
		}

		e.preventDefault();
	};

	// update item submit
	const itemUpdateSubmit = (e) => {
		if (e.target.classList.contains('edit-item')) {
			// get list item id
			const listId = e.target.parentNode.parentNode.id;

			// break into an array
			const listIdArr = listId.split('-');

			// get actual id
			const id = parseInt(listIdArr[1]);

			// get item
			const itemToEdit = ItemCtrl.getItemById(id);

			// set current item
			ItemCtrl.setCurrentItem(itemToEdit);

			// add item to form
			UICtrl.addItemToForm();
		}
		e.preventDefault();
	};

	// Public Methods
	return {
		init: () => {
			console.log('Initialing app...');
			// clear edit state
			UICtrl.clearEditState();

			// Fetch items from data structures
			const items = ItemCtrl.getItems();

			// check if any items
			if (items.length === 0) {
				UICtrl.hideList();
			} else {
				// Populate list with items
				UICtrl.populateItemList(items);
			}

			// get totoal calories
			const totalCalories = ItemCtrl.getTotalCalories();

			// add total calories to UI
			UICtrl.showTotalCalories(totalCalories);

			// Load event listeners
			loadEventListeners();
		}
	};
})(ItemCtrl, UICtrl);

// Initialize app
AppCtrl.init();
