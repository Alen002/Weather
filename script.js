
navigator.geolocation.getCurrentPosition(position => {
   
    let lat = position.coords.latitude; 
    let lon = position.coords.longitude;

    getData(lat, lon); // API request to display weather conditions based on user location
});
 
function searchCity() { // search any city in the world and display results via API request
    let cityName = document.querySelector('#input-city').value
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&${API_key}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('.city').innerHTML = cityName.toUpperCase();
        document.querySelector('.country').innerHTML = 'Country: ' + data.sys.country;
        document.querySelector('.coordinates').innerHTML = 'Lat: ' + data.coord.lat +' ' + 'Lon: ' + data.coord.lon;
        document.querySelector('.temperature').innerHTML = 'Temperature: ' + parseInt((data.main.temp - 273.15)) + '&#8451';
        document.querySelector('.main').innerHTML = data.weather[0].main;
        console.log(data.weather[0].id);
        document.querySelector('i').className = 'wi wi-owm-'+ data.weather[0].id;
        console.log('search city: ' +data.weather[0].id);

        createBackground(data.weather[0].id); // callback createBackground   
    });
}

function getData(lat,lon) { // API request for getting data based on user location
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&${API_key}`)
    .then(response => response.json() )
    .then(data => {
        let div = document.querySelector('#display');

        let city = document.createElement('h2') // city
        city.className = 'city';
        city.innerHTML = data.name.toUpperCase();
        div.appendChild(city);

        let country = document.createElement('p') // country
        country.className = 'country';
        country.innerHTML = 'Country: ' + data.sys.country;
        div.appendChild(country);
        
        let latitude = document.createElement('p') // latitude
        latitude.className = 'coordinates';
        latitude.innerHTML = 'Lat: ' + data.coord.lat +' ' + 'Lon: ' + data.coord.lon;
        div.appendChild(latitude);

        let temp = document.createElement('p') // temperature
        temp.className = 'temperature';
        temp.innerHTML = 'Temperature: ' + parseInt((data.main.temp - 273.15)) + '&#8451';
        div.appendChild(temp);

        let main = document.createElement('p') // weather condition
        main.className = 'main';
        main.innerHTML = data.weather[0].main;
        div.appendChild(main);

        console.log(data.weather[0].id)  //get the icon code for current weather condition
        document.querySelector('i').className = 'wi wi-owm-'+ data.weather[0].id; 

        createBackground(data.weather[0].id); //callback createBackground
    });   
}

function createBackground(dataWeather) {
   let body = document.querySelector('body');
   let convert  = dataWeather.toString()
   if(convert >= 200 && convert <= 232) {
        body.style.backgroundImage = 'url(./images/thunderstorm.jpg)';
   } else if(convert >= 300 && convert <= 321) {
        body.style.backgroundImage = 'url(./images/drizzle.jpg)';
   } else if(convert >= 500 && convert <= 532) {
        body.style.backgroundImage = 'url(./images/rain.jpg)';
   } else if(convert >= 600 && convert <= 622) {
        body.style.backgroundImage = 'url(./images/snow.jpg)';
   } else if(convert >= 701 && convert <= 781) {
        body.style.backgroundImage = 'url(./images/atmosphere.jpg)';
   } else if(convert == 800) {
        body.style.backgroundImage = 'url(./images/sunny.jpg)';
   } else {
        body.style.backgroundImage = 'url(./images/clouds.jpg)'
   }
}
