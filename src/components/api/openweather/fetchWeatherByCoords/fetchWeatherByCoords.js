const API_KEY = "c28b86768a874c70b1ecd1343e8f0f24";

// Funcția pentru a obține datele meteo pe baza coordonatelor geografice
export const fetchWeatherByCoords = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      cityName: data.name,
      currentTemp: Math.round(data.main.temp),
      minTemp: Math.round(data.main.temp_min),
      maxTemp: Math.round(data.main.temp_max),
      weatherDescription: data.weather[0].description,
      weatherIcon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      timezoneOffset: data.timezone,
    };
  } catch (error) {
    console.error("Error fetching weather data by coordinates:", error);
    return null;
  }
};
