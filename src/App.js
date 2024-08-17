import React, { useState } from "react";
import SearchBar from "./components/header/searchbar/searchbar";
import WeatherCard from "./components/main/weathercard/weathercard";
import ModalFavorite from "./components/header/modalfavorite/modalfavorite";
import { fetchWeather } from "./components/api/openweather/openweather";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false); // Pentru modalul de eroare

  // Funcția pentru a căuta un oraș și a actualiza datele meteo
  const handleSearch = async (city) => {
    try {
      const data = await fetchWeather(city);
      if (data) {
        setWeatherData(data);
        setError("");
      } else {
        setError("Orașul nu a fost găsit. Te rugăm să încerci din nou.");
        setShowErrorModal(true); // Afișează modalul de eroare
        setWeatherData(null);
      }
    } catch (err) {
      setError("Datele meteo nu sunt disponibile în acest moment.");
      setShowErrorModal(true); // Afișează modalul de eroare
    }
  };

  // Funcția pentru a închide modalul de eroare
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  // Funcția pentru a adăuga orașul curent la favorite
  const handleAddFavorite = () => {
    if (weatherData && !favorites.includes(weatherData.cityName)) {
      const updatedFavorites = [...favorites, weatherData.cityName];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  // Funcția pentru a deschide modalul de favorite
  const handleShowFavorites = () => {
    setShowFavoritesModal(true);
  };

  // Funcția pentru a închide modalul de favorite
  const handleCloseFavoritesModal = () => {
    setShowFavoritesModal(false);
  };

  // Funcția pentru a selecta un oraș favorit din modal
  const handleSelectFavorite = (city) => {
    handleSearch(city);
    setShowFavoritesModal(false);
  };

  return (
    <div className="App">
      <header>
        <SearchBar
          onSearch={handleSearch}
          onShowFavorites={handleShowFavorites}
        />
        {weatherData && (
          <button className="add-favorite-button" onClick={handleAddFavorite}>
            Adaugă la favorite
          </button>
        )}
      </header>
      <main>
        {error && <p className="error-message">{error}</p>}
        {weatherData && <WeatherCard weather={weatherData} />}
      </main>
      {showFavoritesModal && (
        <ModalFavorite
          favorites={favorites}
          onClose={handleCloseFavoritesModal}
          onSelectFavorite={handleSelectFavorite}
        />
      )}
      {/* Modal de eroare */}
      {showErrorModal && (
        <div className="error-modal">
          <div className="modal-content">
            <p>Orașul introdus nu a fost găsit. Verifică dacă este corect.</p>
            <button onClick={handleCloseErrorModal}>Închide</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
