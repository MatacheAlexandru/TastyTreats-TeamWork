import React from "react";
import "./LocationButton.css";
import { fetchWeatherByCoords } from "../../api/openweather/fetchWeatherByCoords/fetchWeatherByCoords";

function LocationButton({ setWeatherData, setError, setShowErrorModal }) {
  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await fetchWeatherByCoords(latitude, longitude); // Folosim fetchWeatherByCoords
            if (data) {
              setWeatherData(data); // Actualizează datele meteo
              setError("");
            } else {
              setError("Datele meteo nu sunt disponibile.");
              setShowErrorModal(true); // Afișează modalul de eroare
            }
          } catch (err) {
            setError("Eroare la obținerea datelor de locație.");
            setShowErrorModal(true);
          }
        },
        (error) => {
          console.error("Eroare la geolocație:", error);
          setError("Nu s-a putut obține locația.");
          setShowErrorModal(true);
        }
      );
    } else {
      setError("Geolocația nu este suportată de browser.");
      setShowErrorModal(true);
    }
  };

  return (
    <button onClick={handleLocationClick} className="icon-location">
      <img src="/icons/location-icon.png" alt="Locația curentă" />
    </button>
  );
}

export default LocationButton;
