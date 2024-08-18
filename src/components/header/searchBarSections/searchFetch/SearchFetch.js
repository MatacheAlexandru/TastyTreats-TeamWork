import { fetchWeather } from "../../../api/openweather/fetchWeather/fetchWeather";

export const handleSearch = async (
  city,
  setWeatherData,
  setError,
  setShowErrorModal
) => {
  try {
    const data = await fetchWeather(city);
    if (data) {
      setWeatherData(data); // Actualizează datele meteo
      setError(""); // Resetează mesajul de eroare dacă totul funcționează
    } else {
      setError("Orașul nu a fost găsit. Te rugăm să încerci din nou."); // Afișează un mesaj de eroare
      setShowErrorModal(true); // Afișează modalul de eroare
    }
  } catch (err) {
    setError("Datele meteo nu sunt disponibile în acest moment.");
    setShowErrorModal(true);
  }
};
