import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, Users, Clock, Thermometer, Wind, Droplets, Sun, Cloud, DollarSign } from 'lucide-react';
import { WeatherChart } from '../components/WeatherChart';
import { useWeatherStore } from '../store/weather';
import { format } from 'date-fns';

export const CityDetails: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const { cities } = useWeatherStore();
  const cityData = cities.find((city) => city.city === cityName);

  if (!cityData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl">City not found</h2>
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const languages = Object.values(cityData.countryInfo?.languages || {}).join(', ');
  const population = new Intl.NumberFormat().format(cityData.countryInfo?.population || 0);
  const timezone = cityData.countryInfo?.timezones[0] || 'Unknown';
  
  // Get currency information
  const currencies = cityData.countryInfo?.currencies;
  const currencyInfo = currencies ? Object.values(currencies)[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-8 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-gray-600 shadow-md transition-all hover:bg-white hover:text-gray-900 dark:bg-gray-800/90 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </Link>

        <div className="space-y-6">
          {/* Main Weather Card */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {cityData.city}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {cityData.country}
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-gray-900 dark:text-white">
                  {Math.round(cityData.temperature)}°C
                </p>
                <p className="text-xl capitalize text-gray-600 dark:text-gray-300">
                  {cityData.condition}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <Thermometer className="mr-3 h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Feels like</p>
                  <p className="font-medium dark:text-white">{Math.round(cityData.temperature)}°C</p>
                </div>
              </div>
              <div className="flex items-center rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <Droplets className="mr-3 h-6 w-6 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                  <p className="font-medium dark:text-white">{cityData.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                <Wind className="mr-3 h-6 w-6 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
                  <p className="font-medium dark:text-white">{cityData.windSpeed} km/h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Forecast Chart */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              7-Day Forecast
            </h2>
            <WeatherChart forecast={cityData.forecast} />
          </div>

          {/* Country Information */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="flex items-center">
                <Globe className="mr-3 h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Languages</p>
                  <p className="font-medium dark:text-white">{languages}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="flex items-center">
                <Users className="mr-3 h-6 w-6 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Population</p>
                  <p className="font-medium dark:text-white">{population}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="flex items-center">
                <Clock className="mr-3 h-6 w-6 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time Zone</p>
                  <p className="font-medium dark:text-white">{timezone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Currency Information */}
          {currencyInfo && (
            <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="flex items-center">
                <DollarSign className="mr-3 h-6 w-6 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>
                  <p className="font-medium dark:text-white">
                    {currencyInfo.name} ({currencyInfo.symbol})
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-8 rounded-lg bg-white/80 p-4 text-center backdrop-blur-sm dark:bg-gray-800/80">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
              <span className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                Your Location: {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </span>
              <span className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {format(new Date(), 'PPpp')}
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};