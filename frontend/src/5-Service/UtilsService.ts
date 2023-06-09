import axios from 'axios';
import appConfig from '../2-Utils/Config';

type Coordinates = {
  latitude: number;
  longitude: number;
};

class UtilsService {
    private getCurrentLocation(): Promise<Coordinates> {
        return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            (error) => {
                reject(error);
            }
            );
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
        });
    }

    private async getCoordinatesFromAddress(address: string): Promise<Coordinates> {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const { lat, lon } = response.data[0];
        return { latitude: Number(lat), longitude: Number(lon) };

    }

    private calculateDistance(location1: Coordinates, location2: Coordinates): number {
        const { latitude: lat1, longitude: lon1 } = location1;
        const { latitude: lat2, longitude: lon2 } = location2;

        const earthRadius = 6371; // קילומטרים
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;
        return parseFloat(distance.toFixed(2));
    }

    //Get distance:
    public async calculateDistanceFromCurrentLocation(destination: string): Promise<string> {
        const currentLocation = await this.getCurrentLocation();
        const destinationCoordinates = await this.getCoordinatesFromAddress(destination);
        const distance = this.calculateDistance(currentLocation, destinationCoordinates);
        const formattedDistance = distance.toLocaleString(undefined, { maximumFractionDigits: 2 });
        return formattedDistance;

    }

    // Get weather:
    public async getWeather(location: string): Promise<[number, string, string]> {

        const destination = await this.getCoordinatesFromAddress(location)
        const response = await axios.get(appConfig.weatherURL + destination.latitude + "/" + destination.longitude)
        const weather = response.data
        return weather
    }

    //Get time:        
    public async getLocalTime(location: string): Promise<string> {

        // const destination = location.split(" ")
        const destination = await this.getCoordinatesFromAddress(location)

        const response = await axios.get<string>(appConfig.timeURL + destination.latitude + "/" + destination.longitude)

        const time = response.data
        return time
    }
}

const utilsService = new UtilsService();
export default utilsService;
