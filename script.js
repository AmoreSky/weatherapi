window.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        event.preventDefault()
        check()
    }
})


const check = async () => {
    button.textContent = 'Loading...';
    let cityName = document.getElementById('cityName').value;
    let key = 'cc6359116b4ba2ae1f24f9aaa4f66ab7';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`;
    if (document.getElementById('cityName').value.trim() == '') {
        error.style = 'display: block'
        error.innerHTML = "<h6>Please enter a city name</h6>";
        show.style = 'display: none';
        button.textContent = 'Check Weather';
        return;
    } else {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                 if(result.cod == '404'){
                        error.style = 'display: block'
                        error.innerHTML = "<h6>City not found. Please check the spelling and try again.</h6>";
                        show.style = 'display: none';
                        button.textContent = 'Check Weather';
                        return
                        
                    }
                console.log(result.name, result.sys.country, result.weather[0].main, result.weather[0].description);
                error.style = 'display: none'
                show.style = "display: block";
                let location = `${result.name}, ${result.sys.country}`;
                let desc = result.weather[0].description;
                let hum = result.main.humidity;
                let wind = `${result.wind.speed}m/s`;
                let temp = `${result.main.temp}&deg;C`;
                let tempMin = `${result.main.temp_min}&deg;C`;
                let tempMan = `${result.main.temp_max}&deg;C`;
                let icon = result.weather[0].icon;
                let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                show.innerHTML = `<img id="weather-icon" src="${iconUrl}" alt="Weather icon">
                                  <h6>Weather Details</h6>
                                  <div><p>Location:</p><p>${location}</p></div>
                                  <div><p>Description</p><p>${desc}</p></div>
                                  <div><p>Humidity:</p><p>${hum}%</p></div>
                                  <div><p>Wind:</p><p>${wind}</p></div> 
                                  <div><p>Temperature:</p><p>${temp}</p></div> 
                                  <div><p>Min:</p><p>${tempMin}</p></div> 
                                  <div><p>Max:</p><p>${tempMan}</p></div>`;
                button.textContent = 'Check Weather';

            })
            .catch((err) => {
                console.log(err);
            });

    }
}
