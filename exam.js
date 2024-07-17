const apiKey = 'b1c1699325f9b076048a65fdf2606abf';
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('cityInput');
const weatherResultsContainer = document.getElementById('weather-results');

function fetchWeatherData(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const weatherElement = createWeatherElement(data);
      weatherResultsContainer.appendChild(weatherElement);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      const errorElement = createErrorElement();
      weatherResultsContainer.appendChild(errorElement);
    });
}

function createWeatherElement(data) {
  const weatherElement = document.createElement('div');
  weatherElement.classList.add('weather-item');

  const cityNameElement = document.createElement('h2');
  cityNameElement.textContent = data.name;

  const temperatureElement = document.createElement('p');
  temperatureElement.textContent = `${data.main.temp} C`;

  const humidityElement = document.createElement('p');
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

  const windSpeedElement = document.createElement('p');
  windSpeedElement.textContent = `Wind Speed: ${data.wind.speed}m/s`;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = data.weather[0].description;

  weatherElement.appendChild(cityNameElement);
  weatherElement.appendChild(temperatureElement);
  weatherElement.appendChild(humidityElement);
  weatherElement.appendChild(windSpeedElement);
  weatherElement.appendChild(descriptionElement);

  return weatherElement;
}

function createErrorElement() {
  const errorElement = document.createElement('p');
  errorElement.textContent = 'Error fetching weather data.';
  errorElement.classList.add('error-message');
  return errorElement;
}

searchButton.addEventListener('click', () => {
  const cities = cityInput.value.split(',');
  for (const city of cities) {
    fetchWeatherData(city.trim());
  }
});

function reset() {
  cityInput.value = '';
  weatherResultsContainer.innerHTML = '';
}