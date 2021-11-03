export const locService = {
    getLocs
}

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
    const weather = getWeather(lat,lng)
    locs.posh({name, lat, lng, weather, createdAt: new Date(), updatedAt: new Date()})
}

