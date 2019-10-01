class Weather {
	constructor(city, state) {
		this.apiKey = '6c367abdef2bd445d641a148828c013e';
		this.city = city;
		this.state = state;
	}

	// Fetch weather from api
	async getWeather() {
		const response = await fetch(
			`http://api.weatherstack.com/current?access_key=${this.apiKey}&query=${this.city},${this.state}`
		);
		const responseData = await response.json();

		return responseData;
	}

	// change location
	changeLocation(city, state) {
		this.city = city;
		this.state = state;
	}
}
