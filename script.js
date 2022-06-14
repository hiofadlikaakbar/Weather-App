const weather = {
  apikey: "f0ef94f3950ba632ec9c066d13d07a10",
  getWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`
    )
      .then((response) => response.json())
      .then((data) => this.spawnWeather(data))
      .catch((err) => console.error(err));
  },
  spawnWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(
      ".icon"
    ).src = `http://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = `${temp} °C`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity} %`;
    document.querySelector(".wind").innerText = `Wind Speed: ${speed} km/h`;
    document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`;
  },
  search: function () {
    this.getWeather(document.querySelector(".search-bar").value);
  },
};
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    weather.search();
  }
});
