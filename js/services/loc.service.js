export const locService = {
  getLocs,
  saveLoc,
  getPlaceAddress,
  deleteLoc,
  initLocs,
  getCoordsByName,
};

import { weatherService } from './weather.service.js';
import { storageService } from './storage.service.js';

const locs = [];

<<<<<<< HEAD
function initLocs(){
    var initialLocs = (storageService.loadFromStorage('locations')) ? storageService.loadFromStorage('locations') : [
        { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
        { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
    ]
    initialLocs.forEach(loc => locs.push(loc))
    // console.log('locs',locs);
=======
function initLocs() {
  var initialLocs = storageService.loadFromStorage('locations')
    ? storageService.loadFromStorage('locations')
    : [
        { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
        { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
      ];
  initialLocs.forEach((loc) => locs.push(loc));
  return locs
>>>>>>> f54998d5aff688ddf3501427171d486af544efcc
}

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs);
    }, 2000);
  });
}

<<<<<<< HEAD
function saveLoc(name, lat, lng){
    // const weather = getWeather(lat,lng)
    // const loc = {id: getId(), name, lat, lng, weather, createdAt: new Date(), updatedAt: new Date()}
    locs.push({name, lat, lng})
    // console.log(locs);
    storageService.saveToStorage('locations', locs)
=======
function saveLoc(name, lat, lng) {
  locs.push({ name, lat, lng });
  storageService.saveToStorage('locations', locs);
>>>>>>> f54998d5aff688ddf3501427171d486af544efcc
}

function getPlaceAddress(lat, lng) {
<<<<<<< HEAD
    // console.log(lat, lng);
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB3asC7L8WZF_qB7U01nT4Qmd-kxTMqcgY`)
    .then((res) => {
        // console.log(res.data);
        const city = res.data.results[0].address_components.find(scalePop => scalePop.types.includes('political'))
        const country = res.data.results[0].address_components.find(scalePop => scalePop.types.includes('country'))
        const placeInfo = {
            country: country.short_name,
            city: city.long_name,
        }
        // console.log(placeInfo);
        // weatherService.getWeather(city.long_name)
        return placeInfo
    })
    .catch((err) => {console.log('Error', err);})
}

getPlaceAddress(32.047104,34.832384)
// getPlaceAddress(40.714224,-73.961452)

function deleteLoc(lat,lng){
  const idx = locs.findIndex(loc =>{
      return (loc.lat=== lat && loc.lng === lng)
  })
  locs.splice(idx,1)
}

=======
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB3asC7L8WZF_qB7U01nT4Qmd-kxTMqcgY`
    )
    .then((res) => {
      console.log(res.data);
      const placeInfo = {
        address: res.data.results[0].formatted_address,
        city: res.data.results[0].address_components[1].long_name,
      };
      return placeInfo;
    })
    .catch(() => {
      console.log('Error');
    });
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
>>>>>>> f54998d5aff688ddf3501427171d486af544efcc
