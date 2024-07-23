let currentWeatherData = null;

// toggle function
document.getElementById("unitToggle").addEventListener("change", function() {
  const unitSpan = document.getElementById("span");
  if (this.checked) {
      unitSpan.innerHTML = `F&deg;`;
  } else {
      unitSpan.innerHTML = `C&deg;`;
  }

  if (currentWeatherData) {
    displayWeatherData(
        currentWeatherData.condition,
        currentWeatherData.cityTempF,
        currentWeatherData.cityFeelsLikeF,
        currentWeatherData.cityName,
        currentWeatherData.cityRegion,
        currentWeatherData.cityCountry,
        currentWeatherData.uv,
        currentWeatherData.cityTempC,
        currentWeatherData.cityFeelsLikeC
    );
  }
});

const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
  const cityInput = document.getElementById("cityInput").value;

  getWeatherData(cityInput);
});

async function getWeatherData(cityName) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8891665701894929aa314121241406&q=${cityName}`, {mode: 'cors'});

  const cityData = await response.json();

  const weather = weatherData(cityData);

  currentWeatherData = weather;

  displayWeatherData(weather.condition, weather.cityTempF, weather.cityFeelsLikeF, weather.cityName, weather.cityRegion, weather.cityCountry, weather.uv, weather.cityTempC, weather.cityFeelsLikeC, weather.logo)
};

async function getGifCondition(condition) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=gFwalcYK4gXeetAeYpwdpApm7eMvf20X&s=${condition}`, {mode: 'cors'});

  const gifData = await response.json();

  return gifData.data.images.original.url;
}

function weatherData(cityData) {
  // city temperature datas
  condition = cityData.current.condition.text;

  cityTempF = cityData.current.temp_f;
  cityFeelsLikeF = cityData.current.feelslike_f;
  humidity = cityData.current.humidity;

  cityTempC = cityData.current.temp_c;
  cityFeelsLikeC = cityData.current.feelslike_c;

  uv = cityData.current.uv;

  logo = cityData.current.condition.icon;

  // city area locations
  cityName = cityData.location.name;
  cityRegion = cityData.location.region;
  cityCountry = cityData.location.country;

  // console.log(cityData);
  console.log(`condition: ${condition}, cityName: ${cityName}, Region: ${cityRegion}, Country: ${cityCountry}, TempF/TempC: ${cityTempF}/${cityTempC}, FeelsLikeF/C: ${cityFeelsLikeF}/${cityFeelsLikeC}, humidity: ${humidity}, uv: ${uv}, logo: ${logo}`);

  var obj = {
    condition: condition,

    cityTempF: cityTempF,
    cityTempC: cityTempC,
    cityFeelsLikeF: cityFeelsLikeF,
    cityFeelsLikeC: cityFeelsLikeC,

    cityName: cityName,
    cityRegion: cityRegion,
    cityCountry: cityCountry,

    uv: uv,

    logo: logo
  }

  console.log(obj);
  return obj;
};

function displayWeatherData(condition, cityTempF, cityFeelsLikeF, cityName, cityRegion, cityCountry, uv, cityTempC, cityFeelsLikeC, logo) {

  const dataWrapper = document.getElementById("dataWrapper");
  dataWrapper.innerHTML = '';

  const background = document.querySelector("body");
  getGifCondition(condition).then(gifUrl => {
    background.style.backgroundImage = `url(${gifUrl})`;
  }).catch(error => {
    console.error('Error fetching GIF:', error);
    background.style.backgroundImage = ''; // Default or no background if fetch fails
  });

  const div = document.createElement("div");

  const conditionCity = document.createElement("div");
  // const conditionIcon = document.createElement("img");

  conditionCity.classList.add("conditionOfCity");
  // conditionIcon.classList.add("conditionLogo");

  conditionCity.textContent = condition;
  // conditionIcon.src = logo;
  // conditionCity.appendChild(conditionIcon);
  div.appendChild(conditionCity);

  const location = document.createElement("div");
  location.classList.add("location");
  location.textContent = `${cityName}, ${cityRegion}, ${cityCountry}`;
  // dataWrapper.appendChild(location);
  div.appendChild(location);

  const dataInfo = document.createElement("div");
  dataInfo.classList.add("weatherInfo");

  const toggle = document.getElementById("unitToggle");
  if (toggle.checked) {
    dataInfo.innerHTML = `Temperature: ${cityTempF}&deg;F &nbsp&nbsp Feels Like: ${cityFeelsLikeF}&deg;F &nbsp&nbsp UV: ${uv}`;
  } else {
    dataInfo.innerHTML = `Temperature: ${cityTempC}&deg;C &nbsp&nbsp Feels Like: ${cityFeelsLikeC}&deg;C &nbsp&nbsp UV: ${uv}`;
  }
  div.appendChild(dataInfo);

  dataWrapper.appendChild(div);

};