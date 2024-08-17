import React, { useState, useEffect } from "react";
import "./weathercard.css";

function WeatherCard({ weather }) {
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
    timezoneOffset,
  } = weather;

  const [currentTime, setCurrentTime] = useState(new Date());

  // Funcția pentru a actualiza ora în funcție de timezone-ul local
  useEffect(() => {
    const updateTime = () => {
      // Obținem ora UTC fără ajustări locale
      const nowUTC = new Date();
      const utcTime = new Date(
        nowUTC.getUTCFullYear(),
        nowUTC.getUTCMonth(),
        nowUTC.getUTCDate(),
        nowUTC.getUTCHours(),
        nowUTC.getUTCMinutes(),
        nowUTC.getUTCSeconds()
      );

      // Adăugăm diferența de fus orar pentru orașul respectiv
      const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);

      // Actualizăm timpul local
      setCurrentTime(localTime);
    };

    // Actualizează ora la fiecare secundă
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup interval la demontarea componentei
    return () => clearInterval(intervalId);
  }, [timezoneOffset]);

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
