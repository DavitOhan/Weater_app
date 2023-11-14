const SEARCH_BUTTON = document.querySelector("#search-button");
const SEARCH_CITY_INPUT = document.querySelector("#city-input");

const LOADING_TEXT = document.querySelector("#load");
const WEATHER_INFO_CONTAINER = document.querySelector(
  "#weather-info-container"
);
const ERROR_MESSAGE = document.querySelector("#error-message");

const WEATHER_CITY = document.querySelector("#weather-city");
const WEATHER_ICON = document.querySelector("#weather-icon");

const APP_ID = "8797f1292cce04f1134808252d8ae571";

const createWeaterCard = (weatherData) => {
  WEATHER_CITY.textContent = weatherData.name;

  WEATHER_ICON.src = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

  const temperatureCelsius = Math.round(weatherData.main.temp - 273.15);
  document.getElementById("temperature-value").textContent = temperatureCelsius;

  LOADING_TEXT.style.display = "none";
  WEATHER_INFO_CONTAINER.style.display = "flex";

  ERROR_MESSAGE.style.display = "none";
};

async function searchWeatherForCity() {
  const CITY_NAME = SEARCH_CITY_INPUT.value.trim();

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${APP_ID}`;

  LOADING_TEXT.style.display = "flex";
  WEATHER_INFO_CONTAINER.style.display = "none";

  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw Object.assign(new Error("Request failed"), {
        response: await response.json(),
      });
    }

    createWeaterCard(await response.json());
  } catch (error) {
    console.error(error);

    ERROR_MESSAGE.textContent = `Error: ${error.message}`;
    ERROR_MESSAGE.style.display = "block";

    LOADING_TEXT.style.display = "none";
    WEATHER_INFO_CONTAINER.style.display = "none";
  }
}

SEARCH_BUTTON.addEventListener("click", searchWeatherForCity);
