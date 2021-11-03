export const weatherService = {
  getWeather,
};

function getWeather(address) {
  const city = address.city;
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cec1523fcd0eed21029b89c3bf7a10f5`)
    // .catch((err) => {
    //   console.log("Error", err);
    // })
    .then((res) => {
      const currWeather = {
        icon: res.data.weather[0].icon,
        description: res.data.weather[0].description,
        temp: res.data.main.temp,
        maxTemp: res.data.main.temp_max,
        minTemp: res.data.main.temp_min,
        wind: res.data.wind.speed,
      };
    //   console.log(currWeather);
      return currWeather;
    });
}
