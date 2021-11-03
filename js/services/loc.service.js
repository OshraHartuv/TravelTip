export const locService = {
    getLocs,
    saveLoc,
    getPlaceAddress,
}

import { weatherService } from './weather.service.js'
import { storageService } from './storage.service.js'

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function saveLoc(name, lat, lng){
    // const weather = getWeather(lat,lng)
    // const loc = {id: getId(), name, lat, lng, weather, createdAt: new Date(), updatedAt: new Date()}
    locs.posh({name, lat, lng})
    storageService.saveToStorage('locations', locs)
}


function getPlaceAddress(lat, lng) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB3asC7L8WZF_qB7U01nT4Qmd-kxTMqcgY`)
    .then((res) => {
        // console.log(res.data);
        const placeInfo = {
            address: res.data.results[0].formatted_address,
            city: res.data.results[0].address_components[1].long_name
        }
        // console.log(placeInfo);
        return placeInfo
    })
    .catch(() => {console.log('Error');})
}

getPlaceAddress(51.5085,-0.1257)
