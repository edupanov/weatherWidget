export async function getCurrentCityName(): Promise<string> {
    try {
        const position = await getCurrentPosition();
        const city = await getCityName(position.coords.latitude, position.coords.longitude);
        return city;
    } catch (error) {
        throw new Error('Failed to get current city.');
    }
}

function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
}

async function getCityName(latitude: number, longitude: number): Promise<string> {
    const apiKey = '68ec2fed9685015b648069f53e3b485c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.name;
    } catch (error) {
        throw new Error('Failed to fetch city data from OpenWeatherMap.');
    }
}