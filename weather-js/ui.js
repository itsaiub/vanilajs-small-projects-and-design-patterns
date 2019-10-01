class UI {
	constructor() {
		this.location = document.getElementById('w-location');
		this.description = document.getElementById('w-desc');
		this.string = document.getElementById('w-string');
		this.icon = document.getElementById('w-icon');
		this.details = document.getElementById('w-details');
		this.cloudCover = document.getElementById('w-cloud');
		this.humidity = document.getElementById('w-humidity');
		this.feelsLike = document.getElementById('w-feels-like');
		this.wind = document.getElementById('w-wind');
		this.windDirection = document.getElementById('w-direction');
	}

	paint(weather) {
		this.location.textContent = `${weather.location.name}, ${weather.location.country}`;
		this.description.textContent = `${weather.current.weather_descriptions[0]}`;
		this.string.textContent = `${weather.current.temperature} ℃`;
		this.icon.setAttribute('src', weather.current.weather_icons[0]);
		this.cloudCover.textContent = `Cloud Cover: ${weather.current.cloudcover}%`;
		this.humidity.textContent = `Relative Humidity: ${weather.current.humidity}`;
		this.feelsLike.textContent = `Feels Like: ${weather.current.feelslike}`;
		this.wind.textContent = `Wind Speed: ${weather.current.wind_speed}`;
		this.windDirection.textContent = `Wind Direction: ${weather.current.wind_dir}`;
	}
}
