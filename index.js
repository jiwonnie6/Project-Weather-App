
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
  const cityInput = document.getElementById("cityInput").value;

  getWeatherData(cityInput);
});

async function getWeatherData(cityName) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8891665701894929aa314121241406&q=${cityName}`, {mode: 'cors'});

  const cityData = await response.json();

  const weather = weatherData(cityData);

  displayWeatherData(weather.condition, weather.cityTempF, weather.cityFeelsLikeF, weather.cityName, weather.cityRegion, weather.cityCountry, weather.uv, weather.cityTempC, weather.cityFeelsLikeC)
};

function weatherData(cityData) {
  // city temperature datas
  condition = cityData.current.condition.text;

  cityTempF = cityData.current.temp_f;
  cityFeelsLikeF = cityData.current.feelslike_f;
  humidity = cityData.current.humidity;

  cityTempC = cityData.current.temp_c;
  cityFeelsLikeC = cityData.current.feelslike_c;

  uv = cityData.current.uv;

  // city area locations
  cityName = cityData.location.name;
  cityRegion = cityData.location.region;
  cityCountry = cityData.location.country;

  // console.log(cityData);
  console.log(`condition: ${condition}, cityName: ${cityName}, Region: ${cityRegion}, Country: ${cityCountry}, TempF/TempC: ${cityTempF}/${cityTempC}, FeelsLikeF/C: ${cityFeelsLikeF}/${cityFeelsLikeC}, humidity: ${humidity}, uv: ${uv}`);

  var obj = {
    condition: condition,

    cityTempF: cityTempF,
    cityTempC: cityTempC,
    cityFeelsLikeF: cityFeelsLikeF,
    cityFeelsLikeC: cityFeelsLikeC,

    cityName: cityName,
    cityRegion: cityRegion,
    cityCountry: cityCountry,

    uv: uv
  }

  console.log(obj);
  return obj;
};

function displayWeatherData(condition, cityTempF, cityFeelsLikeF, cityName, cityRegion, cityCountry, uv, cityTempC, cityFeelsLikeC) {

  const dataWrapper = document.getElementById("dataWrapper");
  dataWrapper.innerHTML = '';

  const div = document.createElement("div");

  const conditionCity = document.createElement("div");
  conditionCity.classList.add("conditionOfCity");
  conditionCity.textContent = condition;
  // dataWrapper.appendChild(conditionCity);
  div.appendChild(conditionCity);

  const location = document.createElement("div");
  location.classList.add("location");
  location.textContent = `${cityName}, ${cityRegion}, ${cityCountry}`;
  // dataWrapper.appendChild(location);
  div.appendChild(location);

  const dataInfo = document.createElement("div");
  dataInfo.classList.add("weatherInfo");
  dataInfo.innerHTML = `Temperature: ${cityTempF}&deg;F / ${cityTempC}&deg;C &nbsp&nbsp Feels Like: ${cityFeelsLikeF}&deg;F / ${cityFeelsLikeC}&deg;C &nbsp&nbsp UV: ${uv}`;
  // dataWrapper.appendChild(dataInfo);
  div.appendChild(dataInfo);

  dataWrapper.appendChild(div);

};