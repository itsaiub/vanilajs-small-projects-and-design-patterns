const data = [
	{
		name: 'Ratul',
		age: 22,
		gender: 'Male',
		lookingfor: 'Female',
		location: 'Comilla',
		image: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`
	},
	{
		name: 'Meraj',
		age: 23,
		gender: 'Male',
		lookingfor: 'Female',
		location: 'Jossore',
		image: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`
	},
	{
		name: 'Younus',
		age: 24,
		gender: 'Male',
		lookingfor: 'Female',
		location: 'Noakhali',
		image: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`
	},
	{
		name: 'Rashed',
		age: 24,
		gender: 'Male',
		lookingfor: 'Female',
		location: 'Sirajgonj',
		image: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`
	},
	{
		name: 'Jannat',
		age: 19,
		gender: 'Female',
		lookingfor: 'Male',
		location: 'Chittagong',
		image: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`
	},
	{
		name: 'Maria',
		age: 20,
		gender: 'Female',
		lookingfor: 'Male',
		location: 'Khulna',
		image: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`
	}
];

const profiles = profileIterator(data);
// call first profile
nextProfile();

// Next event
document.querySelector('#next').addEventListener('click', nextProfile);

function nextProfile() {
	const currentProfile = profiles.next().value;

	if (currentProfile !== undefined) {
		document.getElementById('profileDisplay').innerHTML = ` <ul class='list-group'>
        <li class="list-group-item">Name: ${currentProfile.name}</li>
        <li class="list-group-item">Age: ${currentProfile.age}</li>
        <li class="list-group-item">Gender: ${currentProfile.gender}</li>
        <li class="list-group-item">Looking For: ${currentProfile.lookingfor}</li>
        <li class="list-group-item">Location: ${currentProfile.location}</li>
      </ul>
    `;

		document.getElementById('imageDisplay').innerHTML = `<img src=${currentProfile.image}>`;
	} else {
		// No more profiles
		document.getElementById('profileDisplay').innerHTML = '<h3>No more profiles avilable!</h3>';
		document.getElementById('imageDisplay').innerHTML = '';
	}
}

// Profile Iterator
function profileIterator(profiles) {
	let nextIndex = 0;

	return {
		next: function() {
			return nextIndex < profiles.length ? { value: profiles[nextIndex++], done: false } : { done: true };
		}
	};
}
