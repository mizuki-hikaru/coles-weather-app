'use client';

import styles from './CityWeather.module.css';
import { ChangeEvent, useState } from 'react';
import { WeatherData } from '../../types';

type CityWeatherProps = {
    initialCityName: string;
    initialWeatherData: WeatherData | null;
    initialError: string | null;
};

export default function CityWeather({ initialCityName, initialWeatherData, initialError }: CityWeatherProps) {
    // Initialise state with data from SSR
    const [cityName, setCityName] = useState("");
    const [displayCityName, setDisplayCityName] = useState(initialCityName);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(initialWeatherData);
    const [error, setError] = useState<string | null>(initialError);

    const [loading, setLoading] = useState<boolean>(false);

    const handleCityNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCityName(event.target.value);
    };

    const fetchWeather = async () => {
        if (!navigator.onLine) {
            setError("You are offline. Weather data cannot be updated.");
            return;
        }
        setLoading(true);
        setError(null); // Reset error state before fetching
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/weather?city=${encodeURIComponent(cityName)}`);
            if (response.ok) {
                setWeatherData(await response.json());
                setDisplayCityName(cityName);
            } else {
                setError((await response.json()).message);
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setError('It seems you are offline or the network is down. Weather data cannot be updated.');
            } else {
                setError('Failed to fetch weather data');
            }
        }
        setLoading(false);
    };

    return (
        <div className={styles.weatherContainer}>
            {/* Input field to change city name */}
            <input
                type="text"
                value={cityName}
                onChange={handleCityNameChange}
                placeholder="Enter city name"
                className={styles.input}
            />
            <button className={styles.button} onClick={fetchWeather} disabled={loading}>
                {loading ? 'Loading...' : 'Get Weather'}
            </button>

            {/* Display errors */}
            {error && <p className={styles.error}>{error}</p>}

            {/* Display weather data */}
            {weatherData && (
                <div className={styles.weatherData}>
                    <h2 className={styles.weatherCity}>Weather for {displayCityName}</h2>
                    <div className={styles.weatherImg}>
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                            alt="Weather Icon"
                        />
                    </div>
                    <p className={styles.weatherTemp}>Temperature: {weatherData.temperature}°C</p>
                    <p className={styles.weatherCond}>Condition: {weatherData.description}</p>
                </div>
            )}
        </div>
    );
}
