export const locService = {
  getLocs,
  saveLoc,
  getPlaceAddress,
  deleteLoc,
  initLocs,
  getCoordsByName,
};

import { storageService } from './storage.service.js';

const locs = [];

function initLocs() {
  var initialLocs = storageService.loadFromStorage('locations')
    ? storageService.loadFromStorage('locations')
    : [
        { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
        { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
      ];
  initialLocs.forEach((loc) => locs.push(loc));
  return locs
}

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs);
    }, 2000);
  });
}

function saveLoc(name, lat, lng) {
  locs.push({ name, lat, lng });
  storageService.saveToStorage('locations', locs);
}

function getPlaceAddress(lat, lng) {
    debugger
    // console.log(lat, lng);
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB3asC7L8WZF_qB7U01nT4Qmd-kxTMqcgY`)
    .then((res) => {
        console.log(res.data);
        const address = res.data.results[0].formatted_address
        // const city = res.data.results[0].address_components.find(scalePop => scalePop.types.includes('political'))
        // console.log(city);
        // const country = res.data.results[0].address_components.find(scalePop => scalePop.types.includes('country'))
        // const placeInfo = {
        //     country: country.short_name,
        //     city: city.long_name,
        // }
        // console.log(placeInfo);
        // weatherService.getWeather(city.long_name)
        return address
    })
    .catch((err) => {console.log('Error', err);})
}

function deleteLoc(lat, lng) {
  const idx = locs.findIndex((loc) => {
    return loc.lat === lat && loc.lng === lng;
  });
  locs.splice(idx, 1);
  storageService.saveToStorage('locations', locs)
}

function getCoordsByName(cityName) {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=AIzaSyB3asC7L8WZF_qB7U01nT4Qmd-kxTMqcgY`
    )
    .then((res) => {
      const coords = {
        lat: res.data.results[0].geometry.location.lat,
        lng: res.data.results[0].geometry.location.lng,
      };
    return coords
    });
}
