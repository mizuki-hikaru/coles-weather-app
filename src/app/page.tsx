import styles from './page.module.css';
import CityWeather from './components/CityWeather';
import { InvalidCityNameError } from './types';
import { fetchWeatherData } from './utils';

// Server Component to fetch and display weather data on initial load
export default async function Home({searchParams}: {searchParams: {city?: string}}) {
    const initialCityName = searchParams.city || 'Melbourne, Australia';

    let initialWeatherData = null;
    let initialError = null;
    try {
        initialWeatherData = await fetchWeatherData(initialCityName);
    } catch (error) {
        if (error instanceof InvalidCityNameError) {
            initialError = error.message;
        } else {
            initialError = 'Failed to fetch weather data';
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Weather Information</h1>
            <CityWeather
                initialCityName={initialCityName}
                initialWeatherData={initialWeatherData}
                initialError={initialError}
            />
        </div>
    );
}
