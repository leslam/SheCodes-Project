// Feature 1
// let days = [
// "Sunday",
// "Monday",
// "Tuesday",
// "Wednesday",
// "Thursday",
// "Friday",
// "Saturday",
// ];
// let months = [
// "Jan",
// "Feb",
// "Mar",
// "Apr",
// "May",
// "Jun",
// "Jul",
// "Aug",
// "Sep",
// "Oct",
// "Nov",
// "Dec",
// ];

// let now = new Date();

// let h2 = document.querySelector("h2");

// let day = days["6"];
// let month = months[now.getMonth("10")];
// let date = "20";
// let year = now.getFullYear();

// let hours = now.getHours();
// if (hours < "10") {
// (hours = `0${hours}`);
// }
// let minutes = now.getMinutes();
// if (minutes < "10") {
// minutes = `0${minutes}`;
// }

// h2.innerHTML = `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;

// Feature 2
// function search(event) {
// event.preventDefault();
// let searchInput = document.querySelector("#search-form-input");

// let p = document.querySelector("#searching");
// if (searchInput.value) {
// p.innerHTML = `Searching for ${searchInput.value}...`;
// } else {
// p.innerHTML = "null";
// alert("Please type a city");
// }
// }

// let form = document.querySelector("#search-form");
// form.addEventListener("submit", search);

// Bonus Feature
// let temperature = document.querySelector("#nyc");

// function fahrenheit(event) {
// event.preventDefault();
// temperature.innerHTML = "55";
// }

// let fahrenheitLink = document.querySelector("#fahrenheit");
// fahrenheitLink.addEventListener("click", fahrenheit);

// function celsius(event) {
// event.preventDefault();
// temperature.innerHTML = "13";
// }

// let celsiusLink = document.querySelector("#celsius");
// celsiusLink.addEventListener("click", celsius);

// Bonus points
function showLocation(position) {
  // let latitude = position.coords.latitude;
  // let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "50eb452afdb91f1daa0d87b94b849c06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

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
  let units = "imperial";
  let cityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(cityApiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  // let temperatureElement = document.querySelector("#nyc");
  // let temperature = Math.round(response.data.main.temp);
  // let heading = document.querySelector("h1")
  // let city = response.data.name;
  // heading.innerHTML = city;
  // temperatureElement.innerHTML = temperature;
  let iconElement = document.querySelector("#icon");
  document.querySelector("#nyc").innerHTML = Math.round(
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

  let apiKey = "50eb452afdb91f1daa0d87b94b849c06";
  let units = "imperial";
  let cityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(cityApiUrl).then(displayWeatherCondition);
}
