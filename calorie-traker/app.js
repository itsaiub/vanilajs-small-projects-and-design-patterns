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
			{ id: 0, name: 'Eggs', calories: 300 },
			{ id: 1, name: 'Chicken', calories: 500 },
			{ id: 2, name: 'Meat', calories: 400 }
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
		itemName: '#item-name',
		itemCalories: '#item-calories'
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

			console.log(newItem);
		}

		e.preventDefault();
	};

	// Public Methods
	return {
		init: () => {
			console.log('Initialing app...');

			// Fetch items from data structures
			const items = ItemCtrl.getItems();

			// Populate list with items
			UICtrl.populateItemList(items);

			// Load event listeners
			loadEventListeners();
		}
	};
})(ItemCtrl, UICtrl);

// Initialize app
AppCtrl.init();
