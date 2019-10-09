const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const searchInputEl = document.querySelector(".search");
const suggestionsEl = document.querySelector(".suggestions");

const cities = [];

const getData = async function(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

getData(endpoint).then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArr = findMatches(this.value, cities);
  const html = matchArr
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
    })
    .join("");
  suggestionsEl.innerHTML = html;
}
searchInputEl.addEventListener("input", displayMatches);
// Display Capital and Country

const endpoint2 = "https://countriesnode.herokuapp.com/v1/countries";

const countries = [];

getData(endpoint2).then((data) => countries.push(...data));

function findMatchesCountry(wordToMatch, countries) {
  return countries.filter((country) => {
    const regex = new RegExp(wordToMatch, "gi");
    return country.name.match(regex) || country.capital.match(regex);
  });
}

function displayMatchesCountry() {
  const matchArr = findMatchesCountry(this.value, countries);
  const html = matchArr
    .map((country) => {
      const regex = new RegExp(this.value, "gi");
      const countryName = country.name.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      const capitalName = country.capital.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      return `
      <li>
        <span class="name">${capitalName}, ${countryName}</span>
        <span class="population">Currency: ${country.currency}</span>
      </li>
    `;
    })
    .join("");
  suggestionsEl.innerHTML = html;
}
// searchInputEl.addEventListener("input", displayMatchesCountry);
