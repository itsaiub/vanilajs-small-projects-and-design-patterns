const User = function(name) {
	this.name = name;
	this.chatroom = null;
};

User.prototype = {
	send: function(msg, to) {
		this.chatroom.send(msg, this, to);
	},
	receive: function(msg, from) {
		console.log(`${from.name} to ${this.name}: ${msg}`);
	}
};

const Chatroom = function() {
	let users = {}; // list of users

	return {
		register: function(user) {
			users[user.name] = user;
			user.chatroom = this;
		},
		send: function(msg, from, to) {
			if (to) {
				// single user message
				to.receive(msg, from);
			} else {
				// mass message
				for (key in users) {
					if (users[key] !== from) {
						users[key].receive(msg, from);
					}
				}
			}
		}
	};
};

const younus = new User('Younus');
const ratul = new User('Ratul');
const rashed = new User('Rashed');
const meraj = new User('Meraj');

const chatroom = new Chatroom();
chatroom.register(younus);
chatroom.register(ratul);
chatroom.register(rashed);
chatroom.register(meraj);

younus.send('Hello Rashed', rashed);
rashed.send("Hello, What's up?", younus);
