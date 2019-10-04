// Storage Controller
const StorageCtrl = (function() {
	// public methods
	return {
		storeItem: (item) => {
			let items;
			if (localStorage.getItem('items') === null) {
				items = [];
				items.push(item);
				localStorage.setItem('items', JSON.stringify(items));
			} else {
				items = JSON.parse(localStorage.getItem('items'));
				items.push(item);
				localStorage.setItem('items', JSON.stringify(items));
			}
		},
		getItemsFromStorage: () => {
			let items;
			if (localStorage.getItem('items') === null) {
				items = [];
			} else {
				items = JSON.parse(localStorage.getItem('items'));
			}
			return items;
		},
		updateItemStorage: (updatedItem) => {
			let items = JSON.parse(localStorage.getItem('items'));

			items.forEach((item, index) => {
				if (updatedItem.id === item.id) {
					items.splice(index, 1, updatedItem);
				}
			});
			localStorage.setItem('items', JSON.stringify(items));
		},
		deleteItemFromStorge: (id) => {
			let items = JSON.parse(localStorage.getItem('items'));

			items.forEach((item, index) => {
				if (id === item.id) {
					items.splice(index, 1);
				}
			});
			localStorage.setItem('items', JSON.stringify(items));
		}
	};
})();

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
		items: StorageCtrl.getItemsFromStorage(),
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

		updateItem: (name, calories) => {
			calories = parseInt(calories);
			let found = null;
			data.items.forEach((item) => {
				if (item.id === data.currentItem.id) {
					item.name = name;
					item.calories = calories;
					found = item;
				}
			});
			return found;
		},

		deleteItem: (id) => {
			// get ids
			ids = data.items.map((item) => {
				return item.id;
			});
			// get index
			const index = ids.indexOf(id);

			// remove item
			data.items.splice(index, 1);
		},

		clearAllItems: () => {
			data.items = [];
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
		listItems: '#item-list li',
		addBtn: '.add-btn',
		updateBtn: '.update-btn',
		deleteBtn: '.delete-btn',
		clearBtn: '.clear-btn',
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
		updateListItem: (item) => {
			let listItems = document.querySelectorAll(UISelectors.listItems);

			// turn nodelist to array
			listItems = Array.from(listItems);

			listItems.forEach((itemList) => {
				const itemID = itemList.getAttribute('id');

				if (itemID === `item-${item.id}`) {
					document.querySelector(`#${itemID}`).innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Callories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;
				}
			});
		},

		deleteListItem: (id) => {
			const itemId = `#item-${id}`;
			const item = document.querySelector(itemId);
			item.remove();
		},

		clearInput: () => {
			document.querySelector(UISelectors.itemName).value = '';
			document.querySelector(UISelectors.itemCalories).value = '';
		},
		addItemToForm: () => {
			document.querySelector(UISelectors.itemName).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(UISelectors.itemCalories).value = ItemCtrl.getCurrentItem().calories;
			UICtrl.showEditState();
		},
		hideList: () => {
			document.querySelector(UISelectors.itemList).style.display = 'none';
		},
		removeAllItems: () => {
			let listItems = document.querySelectorAll(UISelectors.listItems);

			listItems = Array.from(listItems);

			listItems.forEach((item) => {
				item.remove();
			});
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
const AppCtrl = (function(ItemCtrl, UICtrl, StorageCtrl) {
	// Load Event Listeners
	const loadEventListeners = function() {
		const UISelectors = UICtrl.getSelectors();

		// Add item event
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

		// disable submitn on enter
		document.addEventListener('keypress', (e) => {
			if (e.keyCode === 13 || e.which === 13) {
				e.preventDefault();
				return false;
			}
		});

		// Edit icon click event
		document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

		// Update item event
		document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

		// back button event
		document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

		// Update item event
		document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

		// clear items event
		document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems);
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

			// store in local storage
			StorageCtrl.storeItem(newItem);

			// clear fields
			UICtrl.clearInput();
		}

		e.preventDefault();
	};

	// click edit item
	const itemEditClick = (e) => {
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

	// item update submit
	const itemUpdateSubmit = (e) => {
		// get item input
		const input = UICtrl.getItemInput();

		// update item
		const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

		// update UI
		UICtrl.updateListItem(updatedItem);

		// get totoal calories
		const totalCalories = ItemCtrl.getTotalCalories();

		// add total calories to UI
		UICtrl.showTotalCalories(totalCalories);

		// udate local storage
		StorageCtrl.updateItemStorage(updatedItem);

		UICtrl.clearEditState();

		e.preventDefault();
	};

	// item delete submit
	const itemDeleteSubmit = (e) => {
		// get current item
		const currentItem = ItemCtrl.getCurrentItem();

		// delete from data structure
		ItemCtrl.deleteItem(currentItem.id);

		// delete from ui
		UICtrl.deleteListItem(currentItem.id);

		// get totoal calories
		const totalCalories = ItemCtrl.getTotalCalories();

		// add total calories to UI
		UICtrl.showTotalCalories(totalCalories);

		// delete from local storage
		StorageCtrl.deleteItemFromStorge(currentItem.id);

		UICtrl.clearEditState();

		e.preventDefault();
	};

	// clear items event
	const clearAllItems = () => {
		// Delete all from data structure
		ItemCtrl.clearAllItems();

		// get totoal calories
		const totalCalories = ItemCtrl.getTotalCalories();

		// add total calories to UI
		UICtrl.showTotalCalories(totalCalories);

		// remove from ui
		UICtrl.removeAllItems();

		// hide ul
		UICtrl.hideList();
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
})(ItemCtrl, UICtrl, StorageCtrl);

// Initialize app
AppCtrl.init();
