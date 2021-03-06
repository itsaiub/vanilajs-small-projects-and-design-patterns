// function EventObserver() {
// 	this.observers = [];
// }

// EventObserver.prototype = {
// 	subscribe: function(fn) {
// 		this.observers.push(fn);
// 		console.log(`You are now subscribed to ${fn.name}`);
// 	},

// 	unsubscribe: function(fn) {
// 		/*
//    Filter out from the list whatever matches the callback function. If
//    there is no match, the callback gets to stay on the list. The filter
//    returns a new list and reassigns the list of observers.
//   */
// 		this.observers = this.observers.filter(function(item) {
// 			if (item !== fn) {
// 				return item;
// 			}
// 		});
// 		console.log(`You are now unsubscribe from ${fn.name}`);
// 	},

// 	fire: function() {
// 		this.observers.forEach(function(item) {
// 			item.call();
// 		});
// 	}
// };

class EventObserver {
	constructor() {
		this.observers = [];
	}
	subscribe(fn) {
		this.observers.push(fn);
		console.log(`You are now subscribed to ${fn.name}`);
	}
	unsubscribe(fn) {
		this.observers = this.observers.filter((item) => {
			if (item !== fn) {
				return item;
			}
		});
		console.log(`You are now unsubsribed to ${fn.name}`);
	}
	fire(fn) {
		this.observers.forEach((item) => {
			item.call();
		});
	}
}

const click = new EventObserver();
// Event listeners
document.querySelector('.sub-ms').addEventListener('click', function() {
	click.subscribe(getCurMiliSeconds);
});

document.querySelector('.unsub-ms').addEventListener('click', function() {
	click.unsubscribe(getCurMiliSeconds);
});

// Event listeners
document.querySelector('.sub-s').addEventListener('click', function() {
	click.subscribe(getCurSeconds);
});

document.querySelector('.unsub-s').addEventListener('click', function() {
	click.unsubscribe(getCurSeconds);
});

document.querySelector('.fire').addEventListener('click', function() {
	click.fire();
});

// click handler
const getCurMiliSeconds = function() {
	console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
};
const getCurSeconds = function() {
	console.log(`Current Seconds: ${new Date().getSeconds()}`);
};
