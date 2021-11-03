export const locService = {
    getLocs,
    saveLoc,
    getPlaceAddress,
    deleteLoc,
    initLocs

}

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
    locs.push({name, lat, lng})
    console.log(locs);
    storageService.saveToStorage('locations', locs)
}


function getPlaceAddress(lat, lng) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB3asC7L8WZF_qB7U01nT4Qmd-kxTMqcgY`)
    .then((res) => {
        console.log(res.data);
        return res.data.results[0]['formated_address']
    })
}

function deleteLoc(lat,lng){
  const idx = locs.findIndex(loc =>{
      return (loc.lat=== lat && loc.lng === lng)
  })
  locs.splice(idx,1)
}

