import React from 'react';
import { Link } from 'react-router-dom';
import { format, addMinutes } from 'date-fns';
import { Thermometer, Droplets, Wind, Clock } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

const getLocalTime = (timezone: string) => {
  try {
    const match = timezone.match(/UTC([+-])(\d{2}):(\d{2})/);
    if (!match) return { time: '--:--', date: '---' };

    const [, sign, hours, minutes] = match;
    const offset = (parseInt(hours) * 60 + parseInt(minutes)) * (sign === '+' ? 1 : -1);
    
    const now = new Date();
    const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const localTime = addMinutes(utcTime, offset);

    return {
      time: format(localTime, 'HH:mm'),
      date: format(localTime, 'MMM dd, yyyy')
    };
  } catch (error) {
    console.error('Error calculating local time:', error);
    return { time: '--:--', date: '---' };
  }
};

const getWeatherColor = (temp: number) => {
  if (temp <= 0) return 'from-blue-500 to-blue-400';
  if (temp <= 10) return 'from-cyan-500 to-cyan-400';
  if (temp <= 20) return 'from-green-500 to-green-400';
  if (temp <= 30) return 'from-yellow-500 to-yellow-400';
  return 'from-orange-500 to-orange-400';
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const localDateTime = getLocalTime(weather.countryInfo?.timezones[0] || 'UTC+00:00');
  const gradientColor = getWeatherColor(weather.temperature);

  return (
    <Link
      to={`/city/${weather.city}`}
      className="block w-full h-full transition-all transform hover:scale-105"
    >
      <div className={`flex h-full flex-col rounded-lg bg-gradient-to-br ${gradientColor} p-6 shadow-lg`}>
        <div className="flex flex-col justify-between flex-1">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {weather.city}
              </h2>
              <p className="text-sm text-white/90">
                {weather.country}
              </p>
              <div className="flex items-center mt-1 text-xs text-white/80">
                <Clock className="w-3 h-3 mr-1" />
                <span>{localDateTime.time}</span>
                <span className="mx-1">•</span>
                <span>{localDateTime.date}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">
                {Math.round(weather.temperature)}°C
              </p>
              <p className="text-sm capitalize text-white/90">
                {weather.condition}
              </p>
            </div>
          </div>

          <div className="flex justify-between pt-4 mt-4 text-sm border-t border-white/20 text-white/90">
            <div className="flex items-center">
              <Thermometer className="w-4 h-4 mr-1" />
              <span>Feels like {Math.round(weather.temperature)}°C</span>
            </div>
            <div className="flex items-center">
              <Droplets className="w-4 h-4 mr-1" />
              <span>{weather.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="w-4 h-4 mr-1" />
              <span>{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};