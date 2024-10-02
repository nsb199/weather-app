import React from 'react';

function CityList({ cities, getWeather, fetchedCities, selectedCity, setSelectedCity }) {
  return (
    <div className="city-list">
      <button className="get-weather-btn" onClick={getWeather} disabled={fetchedCities.length > 0}>
        Get Weather
      </button>
      <ul>
        {cities.map((city, index) => (
          <li
            key={index}
            className={selectedCity === city || fetchedCities.includes(city) ? 'selected' : ''}
            onClick={() => setSelectedCity(city)}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CityList;
