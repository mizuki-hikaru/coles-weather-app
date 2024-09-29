interface WeatherData {
    temperature: number;
    description: string;
    icon: string;
}

class InvalidCityNameError extends Error {}
