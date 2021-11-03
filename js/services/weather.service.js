export const weatherService = {
  getWeather,
};

function getWeather(city) {
    // console.log(city);
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cec1523fcd0eed21029b89c3bf7a10f5`)
    .then((res) => {
    //   console.log(res.data);
      const currWeather = {
          city,
          temp: res.data.main.temp,
          feelsLike: res.data.main.feels_like,
          humidity: res.data.main.humidity,
          description: res.data.weather[0].description,
          wind: res.data.wind
      }
      console.log(currWeather);
    });
}

