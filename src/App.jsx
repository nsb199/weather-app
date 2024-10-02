import React, { useState, useEffect } from 'react';
import CityList from './components/CityList';
import WeatherDetails from './components/WeatherDetails';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedCities, setFetchedCities] = useState([]);
  const [highlightedCity, setHighlightedCity] = useState('');

  const cities = ['London', 'New York', 'Los Angeles', 'Las Vegas'];

  
  const getWeather = async () => {
    if (fetchedCities.length > 0) return; 
    setIsLoading(true);
    for (let city of cities) {
      await fetchCityWeather(city);
    }
    setIsLoading(false);
  };

  const fetchCityWeather = async (city) => {
    if (fetchedCities.includes(city)) return; 
    try {
      const response = await fetch(
        `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city}`
      );
      const data = await response.json();
      const weather = {
        city,
        description: data.description,
        temperature: data.temp_in_celsius,
        pressure: data.pressure_in_hPa,
        dataAge: data.date_and_time,
      };
      setWeatherData((prevData) => [...prevData, weather]);
      setFetchedCities((prevCities) => [...prevCities, city]);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const deleteRow = (cityToDelete) => {
    setWeatherData((prevData) =>
      prevData.filter((weather) => weather.city !== cityToDelete)
    );
    setFetchedCities((prevCities) =>
      prevCities.filter((city) => city !== cityToDelete)
    );
  };

 
  const searchCityWeather = async (cityName) => {
    if (!cities.includes(cityName)) return; 


    const cityRow = weatherData.find((weather) => weather.city === cityName);
    
    if (cityRow) {
     
      setHighlightedCity(cityName);
      setTimeout(() => {
        setHighlightedCity('');
      }, 3000);
    } else {
      
      await fetchCityWeather(cityName);
    }
  };

  const updateDescription = (city, newDescription) => {
    setWeatherData((prevData) =>
      prevData.map((weather) =>
        weather.city === city ? { ...weather, description: newDescription } : weather
      )
    );
  };

  useEffect(() => {
    if (selectedCity) {
      fetchCityWeather(selectedCity);
    }
  }, [selectedCity]);

  return (
    <div className="app-container">
      <header>
        <h1>Neeraj Weather App</h1>
      </header>
      <div className="content">
        <CityList
          cities={cities}
          getWeather={getWeather}
          fetchedCities={fetchedCities}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
        <WeatherDetails
          weatherData={weatherData}
          deleteRow={deleteRow}
          searchCityWeather={searchCityWeather}
          updateDescription={updateDescription}
          isLoading={isLoading}
          highlightedCity={highlightedCity}
        />
      </div>
    </div>
  );
}

export default App;
