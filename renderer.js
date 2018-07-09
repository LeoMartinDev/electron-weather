document.addEventListener("DOMContentLoaded", () => {
  const WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
  const APPID = '9254db155a0958cf44487e8180ac3a75'
  const $searchInput = document.getElementById('search-input');
  const $weatherIcon = document.querySelector('.weather-content').querySelector('.wi');
  const $temperature = document.querySelector('.temperature-text');
  const $minTemperature = document.querySelector('.min-temperature-text span');
  const $maxTemperature = document.querySelector('.max-temperature-text span');
  const $city = document.querySelector('.city');
  const $date = document.querySelector('.date');
  const $humidity = document.querySelector('.humidity span');
  const $pressure = document.querySelector('.pressure span');
  const $weatherTemperature = document.querySelector('.weather-temperature');

  function getQueryURL(query) {
    return `${WEATHER_BASE_URL}?APPID=${APPID}&units=metric&q=${query}`;
  }

  async function getWeather(query) {
    const data = await fetch(new Request(getQueryURL(query)));
    const response = await data.json();

    return response;
  };

  function roundFirstDecimal(number) {
    return Math.round(number * 10) / 10;
  }

  $searchInput.addEventListener('keypress', async function (event) {
    const key = event.which || event.keyCode;
    if (key === 13) {
      const data = await getWeather($searchInput.value);
      const baseWeather = data.weather.shift();
      console.log(data)
      $weatherIcon.classList.add(`wi-owm-day-${baseWeather.id}`);
      $temperature.innerHTML = `${roundFirstDecimal(data.main.temp)} °`;
      $minTemperature.innerHTML = `${roundFirstDecimal(data.main.temp_min)} °`;
      $maxTemperature.innerHTML = `${roundFirstDecimal(data.main.temp_max)} °`;
      $city.innerHTML = data.name;
      $humidity.innerHTML = data.main.humidity;
      $pressure.innerHTML = data.main.pressure;
      $weatherTemperature.style.display = 'flex';
    }
  });
});