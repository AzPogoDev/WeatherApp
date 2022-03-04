export class LocationService {

    getLocation() {
        return new Promise(resolve => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((e) => {
                    resolve(e);
                });
            } else {
                alert('Geolocation is not supported by this browser.');
                redject();
            }
        });

    }


}