import React, { useState, useEffect } from "react";
import "./searchbar.css";
import {
  fetchCitySuggestions,
  fetchWeatherByCoords,
} from "../../api/openweather/openweather";

function SearchBar({ onSearch, onShowFavorites }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [previousSearches, setPreviousSearches] = useState(
    JSON.parse(localStorage.getItem("previousSearches")) || []
  );
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Căutarea sugestiilor de orașe
  useEffect(() => {
    if (city.length > 2) {
      const loadSuggestions = async () => {
        const suggestedCities = await fetchCitySuggestions(city);
        setSuggestions(suggestedCities);
      };
      loadSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [city]);

  // Trimiterea formularului
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city)
        .then(() => {
          setSuggestions([]);

          // Salvează căutările anterioare
          setPreviousSearches((prev) => {
            const updatedSearches = [...new Set([city, ...prev])].slice(0, 5); // Memorăm ultimele 5 orașe
            localStorage.setItem(
              "previousSearches",
              JSON.stringify(updatedSearches)
            );
            return updatedSearches;
          });
        })
        .catch(() => {
          setShowErrorModal(true); // Afișează modalul de eroare
        });
    }
  };

  // Selectarea unui oraș din sugestii
  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name); // Pune numele orașului selectat în search bar
    setSuggestions([]);
    onSearch(suggestion.name) // Execută căutarea imediat după selectarea sugestiei
      .catch(() => {
        setShowErrorModal(true); // Afișează modalul de eroare dacă orașul nu este valid
      });
  };

  // Click pe locație curentă
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const weatherData = await fetchWeatherByCoords(latitude, longitude);
          onSearch(weatherData.cityName); // Căutăm orașul și actualizăm cardul meteo
        },
        (error) => {
          console.error("Eroare la obținerea locației:", error);
        }
      );
    } else {
      alert("Geolocația nu este suportată de browserul tău.");
    }
  };

  // Închiderea modalului de eroare
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSubmit} className="searchbar">
        <button
          type="button"
          className="icon-location"
          onClick={handleLocationClick} // Click pe locație
        ></button>
        <input
          type="text"
          placeholder="Caută un oraș"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setSuggestions(previousSearches)} // Arată căutările anterioare când se face click pe input
        />
        <button type="submit">Caută</button>
        <button
          type="button"
          className="icon-favorite"
          onClick={onShowFavorites}
        ></button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}

      {/* Modal pentru eroare */}
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

export default SearchBar;
