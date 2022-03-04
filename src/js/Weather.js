import {
    WeatherService
} from "./WeatherService.js";
import {
    LocationService
} from "./LocationService.js";

export class Weather {
    constructor() {
        this.weatherService = WeatherService.get();
        this.locationService = new LocationService();
        this.retrieveWidgets();
        this.load();

    }

    retrieveWidgets() {
        this.widgets = {
            lat: document.getElementById('userLat').value,
            lng: document.getElementById('userLng').value,
            btn: document.getElementById('search'),
            wrow: document.getElementById('cards-weather'),
            location: document.getElementById('searchTextField').value,
            btnsecondary: document.getElementById('searchweek'),
            locateme: document.getElementById('locateme'),
            spinner: document.getElementById('spinner')
        }
    }

    load() {
        this.widgets.btn.addEventListener('click', (e) => {
            this.getWeather();
        })

        this.widgets.btnsecondary.addEventListener('click', (e) => {
            this.getWeather(true);
        })

        this.widgets.locateme.addEventListener('click', (e) => {
            this.widgets.wrow.innerHTML = "";
            this.widgets.spinner.style.display = "block";
            this.locationService.getLocation().then((e) => {
                this.widgets.spinner.style.display = "none";
                this.getWeather(null, e.coords.latitude, e.coords.longitude);
            });
        })

    }

    getWeather(isMultiple, lat, lng) {
        this.retrieveWidgets();
        if (lat && lng) {
            var weather = this.weatherService.search(lat, lng);
        } else {
            var weather = this.weatherService.search(this.widgets.lat, this.widgets.lng);
        }


        weather.then((result) => {
            if (isMultiple) {
                this.populatesResponses(result);
            } else {
                this.populateResponse(result);
            }
        })
    }

    populatesResponses(result) {

        let days = result.daily;
        const dd = new Date();
        let day = dd.getDay();
        let i = day + 1;

        days.forEach((day) => {

            let d = this.weatherService.getDay(i);
            const cards = `<div class="card m-2" style="style="width: 100%;">
            <div class="card-body">
                <h5 class="card-title">${this.widgets.location} - ${d}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${day.temp.day}°</h6>
                <p class="card-text">La température actuelle est de ${day.temp.day}°, le taux d'humidité est acutellement de ${day.humidity}%</p>
            </div>
        </div>`;

            this.widgets.wrow.innerHTML += cards;
            i++;
            if (i > 6) {
                i = 0;
            }
        })

    }


    populateResponse(result) {
        let day = this.weatherService.getDay();
        const card = `<div class="card" style="style="width: 100%;">
      <div class="card-body">
          <h5 class="card-title"> ${day}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${result.current.temp}°</h6>
          <p class="card-text">La température actuelle est de ${result.current.temp}°, le taux d'humidité est acutellement de ${result.current.humidity}%, et la meteo est de type : ${result.current.weather[0].main}</p>
      </div>
  </div>`;
        this.widgets.wrow.innerHTML = card;

    }

}