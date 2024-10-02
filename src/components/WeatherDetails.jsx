import React, { useState } from 'react';

function WeatherDetails({ weatherData, deleteRow, searchCityWeather, updateDescription, isLoading, highlightedCity }) {
    const [searchInput, setSearchInput] = useState('');
  
    const handleSearch = () => {
      searchCityWeather(searchInput);
    };
  
    return (
      <div className="weather-details">
        <div className="search-section">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search city"
          />
          <button onClick={handleSearch} disabled={isLoading}>
            Search
          </button>
        </div>
  
        {weatherData.length === 0 ? (
          <p className="no-data">No Data</p>
        ) : (
          <table className="details-table">
            <thead>
              <tr>
                <th>City</th>
                <th>Description</th>
                <th>Temperature (°C)</th>
                <th>Pressure (hPa)</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.map((weather, index) => (
                <tr
                  key={index}
                  className={highlightedCity === weather.city ? 'highlighted' : ''}
                >
                  <td>{weather.city}</td>
                  <td
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateDescription(weather.city, e.target.textContent)}
                  >
                    {weather.description}
                  </td>
                  <td>{weather.temperature}</td>
                  <td>{weather.pressure}</td>
                  <td>{weather.dataAge}</td>
                  <td>
                    <button onClick={() => deleteRow(weather.city)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  

export default WeatherDetails;
