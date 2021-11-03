<<<<<<< HEAD
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'

=======
import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
>>>>>>> cb261b83dfe9c930590ac15cc3025c53a8ecc5e1

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSaveLoc = onSaveLoc;
window.onCloseInfoWindow = onCloseInfoWindow;
window.onGoToLoc= onGoToLoc;
window.onDeleteLoc= onDeleteLoc;

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready');
      locService.initLocs()
    })
    .catch(() => console.log('Error: cannot init map'));
}

function onCloseInfoWindow() {
  const infoWindow = mapService.getInfoWindow();
  infoWindow.close();
}

function onSaveLoc() {
  const infoWindow = mapService.getInfoWindow();
  const pos = {
    lat: infoWindow.position.lat(),
    lng: infoWindow.position.lng(),
  };
  var name = document.querySelector('.place-name').value;
  locService.saveLoc(name, pos.lat, pos.lng);
  infoWindow.close();
  onGetLocs()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos');
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onAddMarker() {
  console.log('Adding a marker');
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log('Locations:', locs);
    var strHtml = locs.map((loc) => 
      `<tr>
            <td>${loc.name}</td>
            <td>${loc.lat}</td>
            <td>${loc.lng}</td>
            <td><button onclick="onGoToLoc(${loc.lat}, ${loc.lng})">Go</button></td>
            <td><button onclick="onDeleteLoc(${loc.lat}, ${loc.lng})">Delete</button></td>
        </tr>`
    );
    document.querySelector('.locs').innerHTML = strHtml.join('');
    document.querySelector('.locs-container').classList.remove('hide');
  });
}

function onDeleteLoc(lat,lng){
    locService.deleteLoc(lat,lng);
    onGetLocs()
}

function onGoToLoc(lat,lng){
    // document.querySelector('.locs-container').classList.add('hide')
    mapService.panTo(lat, lng)
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords);
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
      mapService.panTo(pos.coords.latitude, pos.coords.longitude);
    })
    .catch((err) => {
      console.log('err!!!', err);
    });
}
function onPanTo() {
<<<<<<< HEAD
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

=======
  console.log('Panning the Map');
  mapService.panTo(35.6895, 139.6917);
}
>>>>>>> cb261b83dfe9c930590ac15cc3025c53a8ecc5e1
