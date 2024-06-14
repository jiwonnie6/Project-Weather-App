
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
  const cityName = document.getElementById("cityName").value;

  getWeatherData(cityName);
});

async function getWeatherData(cityName) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8891665701894929aa314121241406&q=${cityName}`, {mode: 'cors'});

  const cityData = await response.json();

  weatherData(cityData);
};

function weatherData(cityData) {
  // city temperature datas
  cityTempF = cityData.current.temp_f;
  cityFeelsLikeF = cityData.current.feelslike_f;
  humidity = cityData.current.humidity;

  // city area locations
  cityName = cityData.location.name;
  cityRegion = cityData.location.region;
  cityCountry = cityData.location.country;

  console.log(`cityName: ${cityName}, cityRegion: ${cityRegion}, cityCountry: ${cityCountry}, cityTempF: ${cityTempF}, cityFeelsLikeF: ${cityFeelsLikeF}, humidity: ${humidity}`);

  return {
    cityTempF: cityTempF,
    cityFeelsLikeF: cityFeelsLikeF,
    cityName: cityName,
    cityRegion: cityRegion,
    cityCountry: cityCountry
  }
};