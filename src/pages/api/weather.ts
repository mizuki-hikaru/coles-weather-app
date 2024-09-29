import { NextApiRequest, NextApiResponse } from 'next';
import { WeatherData, WeatherError } from '../../types';

interface WeatherAPIResponse {
    main: { temp: number },
    weather: {
        description: string,
        icon: string,
    }[],
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<WeatherData | WeatherError>) {
    const city = ((typeof req.query.city) === 'string' ? (req.query.city as string) : 'Melbourne');

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    let response = null;
    try {
        response = await fetch(apiUrl);
    } catch {
        res.status(500).json({
            status_code: 500,
            message: "Failed to fetch weather data",
        });
        return;
    }

    if (!response.ok) {
        if (response.status === 404 && (await response.json()).message === 'city not found') {
            res.status(404).json({
                status_code: 404,
                message: `The city "${city}" was not found.`
            });
            return;
        }
        res.status(response.status).json({
            status_code: response.status,
            message: 'Failed to fetch weather data: ' + await response.text(),
        });
        return;
    }

    const data: WeatherAPIResponse = await response.json();

    const result: WeatherData = {
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
    };

    res.status(200).json(result);
}
