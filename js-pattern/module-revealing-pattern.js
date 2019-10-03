/* REVEALING Module PATTERN */
const ItemController = (function() {
	let _data = []; // private variables

	function add(item) {
		// private functions
		_data.push(item);
		console.log('Item Added');
	}

	function get(id) {
		return _data.find((item) => {
			return item.id === id;
		});
	}

	return {
		add: add,
		get: get
	};
})();
ItemController.add({ id: 1, name: 'Khan' });
console.log(ItemController.get(1));
