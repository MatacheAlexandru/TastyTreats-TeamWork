export const handleAddFavorite = (weatherData, favorites, setFavorites) => {
  if (weatherData && !favorites.includes(weatherData.cityName)) {
    const updatedFavorites = [...favorites, weatherData.cityName];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }
};

export const handleShowFavorites = (setShowFavoritesModal) => {
  setShowFavoritesModal(true);
};

export const handleCloseFavoritesModal = (setShowFavoritesModal) => {
  setShowFavoritesModal(false);
};

// Adăugăm parametrii `setWeatherData`, `setError`, `setShowErrorModal` pentru a-i folosi în `handleSearch`
export const handleSelectFavorite = async (
  city,
  setCity,
  handleSearch,
  setShowFavoritesModal,
  setWeatherData,
  setError,
  setShowErrorModal
) => {
  if (!city || city.trim() === "") {
    setError("Nu există un oraș valid în lista de favorite.");
    setShowErrorModal(true);
    return;
  }

  setCity(city);
  handleSearch(city, setWeatherData, setError, setShowErrorModal);
  setShowFavoritesModal(false);
};
