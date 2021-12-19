// Bonus points
function showLocation(position) {
  let apiKey = "50eb452afdb91f1daa0d87b94b849c06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#currently");
currentButton.addEventListener("click", getCurrentPosition);

// Search Engine Task
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function searchCity(city) {
  let apiKey = "50eb452afdb91f1daa0d87b94b849c06";
  let cityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(cityApiUrl).then(displayWeatherCondition);
}

// calculate the date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < "10") {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < "10") {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#icon");
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather["0"].main;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#formatDate").innerHTML = formatDate(
    response.data.dt * "1000"
  );
  document.querySelector("#icon").innerHTML = response.data.weather["0"].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather["0"].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "50eb452afdb91f1daa0d87b94b849c06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather["0"].icon
        }@2x.png" alt="" width="" class="weather-pic" id="weather-pic" />
        <div class="weather-forecast-temps">
          <span class="weather-forecast-temp-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temp-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
