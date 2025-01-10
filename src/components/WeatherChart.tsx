import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ForecastDay } from '../types';
import { format } from 'date-fns';

interface WeatherChartProps {
  forecast: ForecastDay[];
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ forecast }) => {
  const data = forecast.map((day) => ({
    date: format(new Date(day.date), 'EEE'),
    min: Math.round(day.temperature.min),
    max: Math.round(day.temperature.max),
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="max"
            stroke="#ff7300"
            name="Max Temp"
          />
          <Line
            type="monotone"
            dataKey="min"
            stroke="#387908"
            name="Min Temp"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};