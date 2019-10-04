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
		logData: () => {
			return data;
		}
	};
})();

// UI Controller
const UICtrl = (function() {
	const UISelectors = {
		itemList: '#item-list'
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
		}
	};
})();

// App Controller
const AppCtrl = (function(ItemCtrl, UICtrl) {
	// Public Methods
	return {
		init: () => {
			console.log('Initialing app...');
			// Fetch items from data structures
			const items = ItemCtrl.getItems();

			// Populate list with items
			UICtrl.populateItemList(items);
		}
	};
})(ItemCtrl, UICtrl);

// Initialize app
AppCtrl.init();
