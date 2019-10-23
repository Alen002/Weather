
navigator.geolocation.getCurrentPosition(position => {
   
    let lat = position.coords.latitude; 
    let lon = position.coords.longitude;

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&${API_key}`)
    .then(response => response.json() )
    .then(data => {
        let div = document.querySelector('#display');

        let city = document.createElement('h2') // city
        city.innerHTML = data.name;
        div.appendChild(city);

        let country = document.createElement('p') // country
        country.innerHTML = 'Country: ' + data.sys.country;
        div.appendChild(country);
        
        let latitude = document.createElement('p') // latitude
        latitude.innerHTML = 'Lat: ' + data.coord.lat +' ' + 'Lon: ' + data.coord.lon;
        div.appendChild(latitude);

        let temp = document.createElement('p') // temperature
        temp.innerHTML = 'Temperature: ' + parseInt((data.main.temp - 273.15)) + '&#8451';
        div.appendChild(temp);

        let main = document.createElement('p') // weather condition
        main.innerHTML = data.weather[0].main;
        div.appendChild(main);

        console.log(data.weather[0].id)  //get the icon code for current weather condition
        document.querySelector('i').className = 'wi wi-owm-'+ data.weather[0].id;

        let body = document.querySelector('body');  
        
        //get the first number of id to determine background display
        let dataWeather = data.weather[0].id;
        let convert  = dataWeather.toString()
        let array = convert.split("")
        console.log(array[0])

        
switch(array[0])
{
    case '2':
            
        body.style.backgroundImage = 'url(../images/thunderstorm.jpg)';
        break;

    case '3':
        body.style.backgroundImage = 'url(../images/drizzle.jpg)';
        break;

    case '5':
        body.style.backgroundImage = 'url(../images/rain.jpg)';
        break;
    case '6':
        body.style.backgroundImage = 'url(../images/snow.jpg)';
        break;
    case '7':
        body.style.backgroundImage = 'url(../images/atmosphere.jpg)';
        break;
    case '8':
        body.style.backgroundImage = 'url(../images/clouds.jpg)';
        break;
}
    

    });

    
});
 

