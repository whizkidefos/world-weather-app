import React, { useState, useEffect } from 'react';
import { Sun, Moon, CloudSun } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { GlobalWeatherChart } from '../components/GlobalWeatherChart';
import { WeatherTicker } from '../components/WeatherTicker';
import { useWeatherStore } from '../store/weather';
import { useThemeStore } from '../store/theme';
import { getWeatherData } from '../services/api';

const MAJOR_CITIES = [
  'New York',
  'London',
  'Tokyo',
  'Paris',
  'Sydney',
  'Dubai',
  'Singapore',
  'Hong Kong',
];

export const Home: React.FC = () => {
  const { cities, addCity } = useWeatherStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMajorCities = async () => {
      setIsLoading(true);
      try {
        for (const city of MAJOR_CITIES) {
          if (!cities.find(c => c.city === city)) {
            const weatherData = await getWeatherData(city);
            addCity(weatherData);
          }
        }
      } catch (err) {
        setError('Failed to load some cities. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (cities.length === 0) {
      loadMajorCities();
    }
  }, []);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherData(city);
      addCity(weatherData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 pt-8 pb-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CloudSun className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Weather Dashboard
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-white" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
          {isLoading && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
          )}
          {error && (
            <p className="mt-2 text-red-500">{error}</p>
          )}
        </div>

        {cities.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Global Weather Comparison
            </h2>
            <GlobalWeatherChart cities={cities} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city) => (
            <div key={city.city} className="h-full">
              <WeatherCard weather={city} />
            </div>
          ))}
        </div>
      </div>

      <WeatherTicker cities={cities} />
    </div>
  );
};