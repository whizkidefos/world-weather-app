export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  forecast: ForecastDay[];
  countryInfo: CountryInfo;
}

export interface ForecastDay {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  icon: string;
}

export interface CountryInfo {
  name: string;
  capital: string;
  languages: { [key: string]: string };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  population: number;
  timezones: string[];
  flags: {
    png: string;
  };
}