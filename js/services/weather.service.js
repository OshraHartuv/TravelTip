export const weatherService = {
  getWeather,
};

function getWeather(lat,lng) {
  // const city = address.city;
  // console.log(city);
  // return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cec1523fcd0eed21029b89c3bf7a10f5`)
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=cec1523fcd0eed21029b89c3bf7a10f5`)
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
