import React from "react";

const WeatherInfo = ({ weatherData }) => (
  <>
    {weatherData && (
      <div>
        <h2>Weather in {weatherData.location.name}</h2>
        <div>
          <img
            src={weatherData.current.weather_icons[0]}
            alt='symbol for showing the weather'
          />
        </div>
        <div>
          <span>Temperature: </span>
          <span>{weatherData.current.temperature} &deg; Celsius</span>
        </div>

        <div>
          <span>Wind: </span>
          <span>{weatherData.current.wind_speed} mph </span>
          <span>direction {weatherData.current.wind_dir}</span>
        </div>
      </div>
    )}
  </>
);

export default WeatherInfo;
