import React, { useState, useEffect } from "react";
import "./weathercard.css";

function WeatherCard({ weather }) {
  // Hook-urile sunt apelate întotdeauna
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!weather) return; // Dacă nu avem date meteo, ieșim din efect
    const updateTime = () => {
      const nowUTC = new Date();
      const utcTime = new Date(
        nowUTC.getUTCFullYear(),
        nowUTC.getUTCMonth(),
        nowUTC.getUTCDate(),
        nowUTC.getUTCHours(),
        nowUTC.getUTCMinutes(),
        nowUTC.getUTCSeconds()
      );

      const localTime = new Date(
        utcTime.getTime() + weather.timezoneOffset * 1000
      );
      setCurrentTime(localTime);
    };

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [weather]);

  // Condiția pentru afișare
  if (!weather) return null;

  const formatTime = (time) => {
    return time.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (time) => {
    return time.toLocaleDateString("ro-RO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const {
    cityName,
    currentTemp,
    minTemp,
    maxTemp,
    weatherDescription,
    weatherIcon,
    humidity,
    windSpeed,
    pressure,
  } = weather;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="city-name">{cityName}</h2>
        <p className="current-temperature">{currentTemp}°C</p>
      </div>

      <div className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt="Weather Icon"
        />
      </div>

      <div className="weather-description">
        <p>{weatherDescription}</p>
      </div>

      <div className="temp-stats">
        <div className="stat-item">
          <p className="label">Min</p>
          <p className="value">{minTemp}°C</p>
        </div>
        <div className="stat-item">
          <p className="label">Max</p>
          <p className="value">{maxTemp}°C</p>
        </div>
      </div>

      <div className="additional-info">
        <p>Umiditate: {humidity}%</p>
        <p>Viteza vântului: {windSpeed} m/s</p>
        <p>Presiune: {pressure} hPa</p>
      </div>

      <div className="time-stats">
        <p className="label">Ora curentă</p>
        <p className="value">{formatTime(currentTime)}</p>
        <p className="label">Data</p>
        <p className="value">{formatDate(currentTime)}</p>
      </div>
    </div>
  );
}

export default WeatherCard;
