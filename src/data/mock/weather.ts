export interface WeatherForecast {
    date: string;
    tempMin: number;
    tempMax: number;
    condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Thunderstorm';
    humidity: number;
    windSpeed: number; // km/h
}

export const mockWeather: WeatherForecast[] = [
    {
        date: '2024-02-22',
        tempMin: 14,
        tempMax: 26,
        condition: 'Sunny',
        humidity: 45,
        windSpeed: 12
    },
    {
        date: '2024-02-23',
        tempMin: 15,
        tempMax: 27,
        condition: 'Cloudy',
        humidity: 50,
        windSpeed: 15
    },
    {
        date: '2024-02-24',
        tempMin: 13,
        tempMax: 24,
        condition: 'Rainy',
        humidity: 78,
        windSpeed: 22
    }
];
