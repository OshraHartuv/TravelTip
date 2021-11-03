import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
import { weatherService } from './services/weather.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSaveLoc = onSaveLoc;
window.onCloseInfoWindow = onCloseInfoWindow;
window.onGoToLoc = onGoToLoc;
window.onDeleteLoc = onDeleteLoc;
window.onSearch = onSearch;
window.onCopyLink = onCopyLink;

function onInit() {
    var isCopy = (window.location.href.indexOf('lat') > -1) ? true: false;
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready');
      const locs = locService.initLocs();
      mapService.initMarkers(locs);
    })
    .catch(() => console.log('Error: cannot init map'));
}

function onSearch() {
  const cityName = document.querySelector('.search-input').value;
  locService.getCoordsByName(cityName).then((res) => {
    mapService.panTo(res.lat, res.lng);
    locService.saveLoc(cityName, res.lat, res.lng);
    onGetLocs();
    mapService.addMarker(res, cityName);
    const infoWindow = mapService.getInfoWindow();
    infoWindow.close();
  });
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
  mapService.addMarker(pos, name);
  infoWindow.close();
  onGetLocs();
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
    var strHtml = locs.map(
      (loc) =>
        `<tr>
            <td>${loc.name}</td>
            <td>${loc.lat}</td>
            <td>${loc.lng}</td>
            <td><button onclick="onGoToLoc(${loc.lat}, ${loc.lng})">Go</button></td>
            <td><button onclick="onDeleteLoc(${loc.lat}, ${loc.lng})">Delete</button></td>
            <td><button onclick="onCopyLink(${loc.lat}, ${loc.lng})">Copy Link</button></td>
        </tr>`
    );
    document.querySelector('.locs').innerHTML = strHtml.join('');
    document.querySelector('.locs-container').classList.remove('hide');
  });
}

function onCopyLink(lat, lng) {
  const params = new URL(
    `https://oshrahartuv.github.io/TravelTip/index.html?${lat}=1&${lng}=2`
  );
  window.location.assign(`${params}`);
  // console.log(params.get(`${lat}`));
  // console.log(params);
}

function onDeleteLoc(lat, lng) {
  locService.deleteLoc(lat, lng);
  mapService.deleteMarker(lat, lng);
  onGetLocs();
}

function onGoToLoc(lat, lng) {
  // document.querySelector('.locs-container').classList.add('hide')
  mapService.panTo(lat, lng);
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords);
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
      mapService.panTo(pos.coords.latitude, pos.coords.longitude);
    })
    .catch((err) => {
      console.log('err!!!', err);
    });
}

function onPanTo() {
  console.log('Panning the Map');
  mapService.panTo(35.6895, 139.6917);
}
