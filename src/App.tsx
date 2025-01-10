import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CityDetails } from './pages/CityDetails';
import { useThemeStore } from './store/theme';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:cityName" element={<CityDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;