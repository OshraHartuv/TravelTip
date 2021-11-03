export const locService = {
    getLocs,
    saveLoc,
    getPlaceAddress,
    deleteLoc,
    initLocs

}

import { weatherService } from './weather.service.js'
import { storageService } from './storage.service.js'

const locs = []

function initLocs(){
    var initialLocs = (storageService.loadFromStorage('locations')) ? storageService.loadFromStorage('locations') : [
        { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
        { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
    ]
    initialLocs.forEach(loc => locs.push(loc))
    console.log('locs',locs);
}

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
    locs.push({name, lat, lng})
    console.log(locs);
    storageService.saveToStorage('locations', locs)
}


function getPlaceAddress(lat, lng) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB3asC7L8WZF_qB7U01nT4Qmd-kxTMqcgY`)
    .then((res) => {
<<<<<<< HEAD
        // console.log(res.data);
        const placeInfo = {
            address: res.data.results[0].formatted_address,
            city: res.data.results[0].address_components[1].long_name
        }
        // console.log(placeInfo);
        return placeInfo
=======
        console.log(res.data);
        return res.data.results[0]['formated_address']
>>>>>>> cb261b83dfe9c930590ac15cc3025c53a8ecc5e1
    })
    .catch(() => {console.log('Error');})
}

<<<<<<< HEAD
getPlaceAddress(51.5085,-0.1257)
=======
function deleteLoc(lat,lng){
  const idx = locs.findIndex(loc =>{
      return (loc.lat=== lat && loc.lng === lng)
  })
  locs.splice(idx,1)
}

>>>>>>> cb261b83dfe9c930590ac15cc3025c53a8ecc5e1
