export class WeatherService {
    constructor() {
        if (self.instance) {
            throw new Error();
        }

        this.options = {
            apiUrl: 'https://api.openweathermap.org/data/2.5/onecall?',
            apiKey: 'e5074f1c3c72f718b5e8a53bb8a56157'
        };
    }


    async search(lat, long) {

        let result = await fetch(this.options.apiUrl + "lat=" + lat + "&" + "lon=" + long + "&" + "appid=" + this.options.apiKey + "&units=metric&exclude=minutely,hourly");
        return result.json();
    }

    getDay(index) {
        const weekday = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche", "Lundi"];
        const d = new Date();
        if (index) {
            let day = weekday[index];
            return day;
        } else {
            let day = weekday[d.getDay()];
            return day;
        }

    }
    
    static get() {
        if (!self.instance) {
            self.instance = new WeatherService();
        }

        return self.instance;
    }
}