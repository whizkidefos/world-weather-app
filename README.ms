# Weather Dashboard

A beautiful and feature-rich weather dashboard application built with React, TypeScript, and Tailwind CSS. Get real-time weather information for cities worldwide, with detailed forecasts, beautiful visualizations, and comprehensive city details.

![Weather Dashboard](https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=1200&h=400)

## Features

- 🌍 **Global Weather Coverage**: Access weather data for any city worldwide
- 📊 **Interactive Charts**: View temperature trends and weather metrics through beautiful visualizations
- 🌓 **Dark Mode Support**: Toggle between light and dark themes for comfortable viewing
- 🔍 **Smart Search**: Easily find and add new cities to your dashboard
- 📱 **Responsive Design**: Fully responsive layout that works on all devices
- 📈 **Real-time Updates**: Get the latest weather information for your selected cities
- 🗺️ **Detailed City Information**: Access comprehensive city details including:
  - Temperature and weather conditions
  - Humidity and wind speed
  - Local time and date
  - Country information
  - Population data
  - Language information
  - Currency details
  - Time zone

## Technologies Used

- ⚛️ React 18
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 📊 Recharts for data visualization
- 🔄 Zustand for state management
- 📅 date-fns for date formatting
- 🎯 Lucide React for icons
- 🌐 OpenWeather API for weather data
- 🌍 REST Countries API for country information

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeather API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API and other services
├── store/              # State management
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Key Components

- **WeatherCard**: Displays weather information for a single city
- **GlobalWeatherChart**: Shows weather comparisons across cities
- **WeatherChart**: Displays forecast data for a specific city
- **SearchBar**: Allows users to search for and add new cities
- **WeatherTicker**: Shows a scrolling ticker of weather information

## API Integration

The application integrates with two main APIs:

1. **OpenWeather API**
   - Current weather data
   - Weather forecasts
   - Geocoding for accurate city lookup

2. **REST Countries API**
   - Country information
   - Language data
   - Population statistics
   - Currency details

## State Management

The application uses Zustand for state management with two main stores:

1. **Weather Store**: Manages weather data for cities
2. **Theme Store**: Handles dark/light mode preferences

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [OpenWeather](https://openweathermap.org/)
- Country data provided by [REST Countries](https://restcountries.com/)
- Icons by [Lucide](https://lucide.dev/)