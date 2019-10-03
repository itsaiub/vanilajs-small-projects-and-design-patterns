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
		logData: function() {
			return data;
		}
	};
})();

// UI Controller
const UICtrl = (function() {
	// Public Methods
	return {};
})();

// App Controller
const AppCtrl = (function(ItemCtrl, UICtrl) {
	// Public Methods
	return {
		init: function() {
			console.log('Initialing app...');
		}
	};
})(ItemCtrl, UICtrl);

// Initialize app
AppCtrl.init();
