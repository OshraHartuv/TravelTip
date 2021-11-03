export const mapService = {
  initMap,
  addMarker,
  panTo,
};

var gMap;

// function addInfoWindow(){
//     let infoWindow = new google.maps.InfoWindow({
//         content: "Click the map to get Lat/Lng!",
//         position: myLatlng,
//       });

// }

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap');
  return _connectGoogleApi().then(() => {
    console.log('google available');
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    });
    let infoWindow = new google.maps.InfoWindow({
      content: 'Click the map to get save location!',
      position: { lat, lng },
    });
    infoWindow.open(gMap);
    gMap.addListener('click', (mapsMouseEvent) => {
      infoWindow.close();
      infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
      });
      infoWindow.setContent(
       `<h3>Do tou wish to save this location?</h3>
       <p> If so, enter a name. Else click cancel</p>
       <input class="place-name" type="text" placeholder="Enter name">
       <button onclick="onSaveLoc()">Save</button>
       <button  onclick="closeInfoWindow()">Cancel</button>`
      );
      infoWindow.open(gMap);
    });
    console.log('Map!', gMap);
  });
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  });
  return marker;
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng);
  gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = 'AIzaSyDQjVlpzBYO6aHtrU9ydnXSKqk-zq7c6eQ';
  var elGoogleApi = document.createElement('script');
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject('Google script failed to load');
  });
}
