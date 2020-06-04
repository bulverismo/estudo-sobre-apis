
// inicialização do leaflet.js
const mymap = L.map('checkins').setView([0, 0], 4);
const issIcon = L.icon({
  iconUrl: '/images/pino.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16]
});
const attribution = 
  '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution }); 
tiles.addTo(mymap);

function markPosition(lat, lon) {
  console.log('markPosition');
  marker.setLatLng([lat, lon]);
  mymap.setView([lat, lon],4);

}

async function getData() {
  
  const response = await fetch('/api');
  const data = await response.json();

  console.log(data)
  
  // marcando a posição no mapa
  // markPosition(30, 30);
  
  for (item of data) {
    const marker = L.marker([item.lat,item.lon], {icon:issIcon}).addTo(mymap);

    let txt = `O clima nas coordenadas ${item.lat.toFixed(2)}º,${item.lon.toFixed(2)}º é ${item.weather.weather[0].description} com a temperatura ${item.weather.main.temp}º; C.`;

    if ( item.air.value < 0 ) {
      txt += ' Sem medição da qualidade do ar.';
    } else {
      txt += `A concentração de particulas (${item.air.parameter}) é ${item.air.value} ${item.air.unit}, com a ultima leitura realizada em  ${item.air.lastUpdated}.`;
    } 

    marker.bindPopup(txt);
    console.log(txt);
  }
}

getData();

