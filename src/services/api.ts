import axios from 'axios';
import { WeatherData, CountryInfo } from '../types';

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0';
const COUNTRY_API_URL = 'https://restcountries.com/v3.1';

export async function getWeatherData(city: string): Promise<WeatherData> {
  try {
    // Get coordinates first for better accuracy
    const geoResponse = await axios.get(
      `${GEOCODING_API_URL}/direct?q=${city}&limit=1&appid=${WEATHER_API_KEY}`
    );

    if (!geoResponse.data.length) {
      throw new Error('City not found');
    }

    const { lat, lon, country: countryCode } = geoResponse.data[0];

    // Get current weather using coordinates
    const weatherResponse = await axios.get(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    );

    // Get forecast data using coordinates
    const forecastResponse = await axios.get(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    );

    // Get country details
    const countryResponse = await axios.get<CountryInfo[]>(
      `${COUNTRY_API_URL}/alpha/${countryCode}`
    );

    const countryData = countryResponse.data[0];

    // Process forecast data to get daily forecasts
    const dailyForecasts = forecastResponse.data.list.reduce((acc: any[], curr: any) => {
      const date = new Date(curr.dt * 1000).toISOString().split('T')[0];
      if (!acc.find((f: any) => f.date === date)) {
        acc.push({
          date,
          temperature: {
            min: curr.main.temp_min,
            max: curr.main.temp_max,
          },
          condition: curr.weather[0].main,
          icon: curr.weather[0].icon,
        });
      }
      return acc;
    }, []).slice(0, 7);

    return {
      city: weatherResponse.data.name,
      country: countryData.name.common,
      temperature: weatherResponse.data.main.temp,
      condition: weatherResponse.data.weather[0].main,
      icon: weatherResponse.data.weather[0].icon,
      humidity: weatherResponse.data.main.humidity,
      windSpeed: weatherResponse.data.wind.speed,
      forecast: dailyForecasts,
      countryInfo: {
        languages: countryData.languages,
        population: countryData.population,
        timezones: countryData.timezones,
      },
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}