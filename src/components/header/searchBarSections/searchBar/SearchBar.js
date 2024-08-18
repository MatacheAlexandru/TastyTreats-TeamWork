import React, { useState } from "react";
import { handleSearch } from "./SearchFetch";
import {
  handleAddFavorite,
  handleShowFavorites,
  handleCloseFavoritesModal,
  handleSelectFavorite,
} from "../favorite/favoritesHandl/FavoritesHandl";
import ModalFavorite from "../favorite/modalFavorite/ModalFavorite";
import WeatherCard from "../../main/weathercard/weathercard";
import LocationButton from "../location/LocationButton"; // Importă butonul de locație

function SearchBar() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  return (
    <div className="searchbar-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (city.trim() !== "") {
            handleSearch(city, setWeatherData, setError, setShowErrorModal);
          } else {
            setError("Te rugăm să introduci un oraș valid.");
            setShowErrorModal(true);
          }
        }}
      >
        {/* Adăugăm butonul de locație */}
        <LocationButton
          setWeatherData={setWeatherData}
          setError={setError}
          setShowErrorModal={setShowErrorModal}
        />

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Caută un oraș"
        />
        <button type="submit">Caută</button>
      </form>

      {weatherData && (
        <>
          <button
            className="add-favorite-button"
            onClick={() =>
              handleAddFavorite(weatherData, favorites, setFavorites)
            }
          >
            Adaugă la favorite
          </button>
          <WeatherCard weather={weatherData} />
        </>
      )}

      <button
        type="button"
        onClick={() => handleShowFavorites(setShowFavoritesModal)}
      >
        Favorite
      </button>

      {showFavoritesModal && (
        <ModalFavorite
          favorites={favorites}
          onClose={() => handleCloseFavoritesModal(setShowFavoritesModal)}
          onSelectFavorite={(city) =>
            handleSelectFavorite(
              city,
              setCity,
              handleSearch,
              setShowFavoritesModal,
              setWeatherData, // Transmitem parametrii
              setError, // Transmitem parametrii
              setShowErrorModal // Transmitem parametrii
            )
          }
        />
      )}

      {showErrorModal && (
        <div className="error-modal">
          <div className="modal-content">
            <p>{error}</p>
            <button onClick={() => setShowErrorModal(false)}>Închide</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
