const button = document.getElementById('submit');
let lat,lon;
if ("geolocation" in navigator) {
  
  // buscar a latitude e longitude atuais
  navigator.geolocation.getCurrentPosition( async position => {
    let lat,lon,weather,air;
    try {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById("latitude").textContent = lat.toFixed(2);
      document.getElementById("longitude").textContent = lon.toFixed(2);
      // buscar o clima e a qualidade do ar desta latitude e longitude atuais
      const api_url = `/weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      weather = json.weather;
      air = json.air_quality.results[0].measurements[0]; 
      document.getElementById("aq_parameter").textContent = air.parameter;
      document.getElementById("aq_value").textContent = air.value;
      document.getElementById("aq_units").textContent = air.unit;
      document.getElementById("aq_date").textContent = air.lastUpdated;
      document.getElementById("sumary").textContent = weather.weather[0].description;
      document.getElementById("temperature").textContent = weather.main.temp;
            
    } catch {
      console.error('Ocorreu um erro!');
      document.getElementById("aq_parameter").textContent = 'nulo';
      document.getElementById("aq_value").textContent = 'nulo';
      document.getElementById("aq_units").textContent = 'nulo';
      document.getElementById("aq_date").textContent = 'Sem leitura';
      
      // caso não haja leitura da qualidade do ar
      air = { value: -1 };

      //TODO tratar do erro caso não retorne o clima
    }     

    //salva dados no bdzin
    const data = { lat, lon, weather, air };
    console.log('dados weather e air quality');
    console.log(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response2 = await fetch('/api', options);
    const dataReturned = await response2.json();              
    // dados retornados após salvar
    //console.log(dataReturned);

  });
  console.log("geoloca ok")
} else {
  alert("Me descupe mas os serviços de geolocalização não são permitidos no seu navegador.");
}
