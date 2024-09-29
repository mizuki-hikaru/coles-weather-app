'use client';

import styles from './CityWeather.module.css';
import { ChangeEvent, useState } from 'react';
import { fetchWeatherData } from '../utils';
import { WeatherData, InvalidCityNameError } from '../types';

type CityWeatherProps = {
    initialCityName: string;
    initialWeatherData: WeatherData | null;
    initialError: string | null;
};

export default function CityWeather({ initialCityName, initialWeatherData, initialError }: CityWeatherProps) {
    // Initialise state with data from SSR
    const [cityName, setCityName] = useState(initialCityName);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(initialWeatherData);
    const [error, setError] = useState<string | null>(initialError);

    const [loading, setLoading] = useState<boolean>(false);

    const handleCityNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCityName(event.target.value);
    };

    const fetchWeather = async () => {
        setLoading(true);
        setError(null); // Reset error state before fetching
        try {
            setWeatherData(await fetchWeatherData(initialCityName));
        } catch (error) {
            if (error instanceof InvalidCityNameError) {
                setError(error.message);
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
                    <h2 className={styles.weatherCity}>Weather for {cityName}</h2>
                    <p className={styles.weatherTemp}>Temperature: {weatherData.temperature}°C</p>
                    <p className={styles.weatherCond}>Condition: {weatherData.description}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                        alt="Weather Icon"
                    />
                </div>
            )}
        </div>
    );
}
