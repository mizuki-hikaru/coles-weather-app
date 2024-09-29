import styles from './page.module.css';
import CityWeather from './components/CityWeather';
import { WeatherData, WeatherError } from '../types';

// This is a Server Component that fetches data server-side
export default async function Home({searchParams}: {searchParams: {city?: string}}) {
    const city = searchParams.city || 'Melbourne';

    let weatherData: WeatherData | null = null;
    let error: WeatherError | null = null;

    try {
        // Fetch weather data from the API route
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/weather?city=${encodeURIComponent(city)}`);
        if (res.ok) {
            weatherData = await res.json();
        } else {
            error = await res.json();
        }
    } catch(e) {
        error = {
            status_code: 500,
            message: "Internal server error",
        };
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Weather Information</h1>
            <CityWeather
                initialCityName={city}
                initialWeatherData={weatherData}
                initialError={error ? error.message : null}
            />
        </div>
    );
}
