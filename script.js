




navigator.geolocation.getCurrentPosition(position => {
   
    let lat = position.coords.latitude; 
    let lon = position.coords.longitude;

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&${API_key}`)
    .then(response => response.json() )
    .then(data => {
        let div = document.querySelector('#display');
        
        let latitude = document.createElement('p') // latitude
        latitude.innerHTML = 'Latitude: ' + data.coord.lat;
        div.appendChild(latitude);

        let longitude = document.createElement('p') // longitude
        longitude.innerHTML = 'Longitude: ' + data.coord.lon;
        div.appendChild(longitude);

        let country = document.createElement('p') // country
        country.innerHTML = 'Country: ' + data.sys.country;
        div.appendChild(country);

        let city = document.createElement('p') // City
        city.innerHTML = 'City: ' + data.name;
        div.appendChild(city);

        let temp = document.createElement('p') // Temperature
        temp.innerHTML = 'Temperature: ' + (data.main.temp - 273.15);
        div.appendChild(temp);

        let description = document.createElement('p') // description
        description.innerHTML = data.weather[0].main;
        div.appendChild(description);
    });
});
 