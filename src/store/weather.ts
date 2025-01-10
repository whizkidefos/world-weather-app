import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WeatherData } from '../types';

interface WeatherStore {
  cities: WeatherData[];
  addCity: (city: WeatherData) => void;
  removeCity: (cityName: string) => void;
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      cities: [],
      addCity: (city) =>
        set((state) => ({
          cities: [...state.cities.filter((c) => c.city !== city.city), city],
        })),
      removeCity: (cityName) =>
        set((state) => ({
          cities: state.cities.filter((city) => city.city !== cityName),
        })),
    }),
    {
      name: 'weather-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cities: state.cities }),
    }
  )
);