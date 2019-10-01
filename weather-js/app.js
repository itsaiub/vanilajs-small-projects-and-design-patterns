// init storage
const storage = new Storage();

// get stored location
const weatherLocation = storage.getLocationData();

// Init weather
const weather = new Weather(weatherLocation.city, weatherLocation.country);

// init ui
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);

// change location
document.getElementById('w-change-btn').addEventListener('click', (e) => {
	const city = document.getElementById('city').value;
	const country = document.getElementById('country').value;

	// change location
	weather.changeLocation(city, country);

	// set location to storage
	storage.setLocationData(city, country);

	// get and display weather
	getWeather();

	// close modal
	$('#locationModal').modal('hide');

	e.preventDefault();
});

function getWeather() {
	weather
		.getWeather()
		.then((results) => {
			ui.paint(results);
		})
		.catch((err) => console.log(err));
}
