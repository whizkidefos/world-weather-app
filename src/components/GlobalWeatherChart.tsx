import React from 'react';
import {
  LineChart,
  Line,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { WeatherData } from '../types';

interface GlobalWeatherChartProps {
  cities: WeatherData[];
}

export const GlobalWeatherChart: React.FC<GlobalWeatherChartProps> = ({ cities }) => {
  const data = cities.map((city) => ({
    name: city.city,
    temperature: Math.round(city.temperature),
    humidity: city.humidity,
    windSpeed: Math.round(city.windSpeed),
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="h-80 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Temperature Trends</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F3F4F6'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ fill: '#F59E0B' }}
              name="Temperature (°C)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-80 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Weather Metrics</h3>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis 
              dataKey="name"
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
            />
            <PolarRadiusAxis stroke="#6B7280" />
            <Radar
              name="Temperature (°C)"
              dataKey="temperature"
              stroke="#F59E0B"
              fill="#F59E0B"
              fillOpacity={0.5}
            />
            <Radar
              name="Humidity (%)"
              dataKey="humidity"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.5}
            />
            <Radar
              name="Wind Speed (km/h)"
              dataKey="windSpeed"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.5}
            />
            <Legend />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F3F4F6'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};