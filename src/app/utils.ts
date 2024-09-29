import { WeatherData } from './types';

export async function fetchWeatherData(cityName: string): Promise<WeatherData> {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;
    const res = await fetch(apiUrl);
    if (!res.ok) {
        if (res.status === 404 && (await resData.json()).message === 'city not found') {
            throw new InvalidCityNameError(`The city "${cityName}" was not found.`);
        }
        throw new Error('Failed to fetch weather data');
    }
    const data = await res.json();
    return {
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
    };
}
