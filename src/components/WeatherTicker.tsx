import React from 'react';
import { Cloud, Droplets, Wind } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherTickerProps {
  cities: WeatherData[];
}

export const WeatherTicker: React.FC<WeatherTickerProps> = ({ cities }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
      <div className="flex animate-scroll whitespace-nowrap py-2">
        {cities.map((city, index) => (
          <div
            key={`${city.city}-${index}`}
            className="mx-8 flex items-center text-gray-700 dark:text-gray-300"
          >
            <Cloud className="mr-2 h-4 w-4" />
            <span className="font-medium">
              {city.city}: {Math.round(city.temperature)}°C
            </span>
            <Droplets className="ml-4 mr-1 h-4 w-4" />
            <span>{city.humidity}%</span>
            <Wind className="ml-4 mr-1 h-4 w-4" />
            <span>{city.windSpeed} km/h</span>
          </div>
        ))}
      </div>
    </div>
  );
};