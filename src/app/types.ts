export interface WeatherData {
    temperature: number;
    description: string;
    icon: string;
}

export class InvalidCityNameError extends Error {}
