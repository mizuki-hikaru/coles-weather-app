export interface WeatherData {
    temperature: number;
    description: string;
    icon: string;
}

export interface WeatherError {
    status_code: number;
    message: string;
}
