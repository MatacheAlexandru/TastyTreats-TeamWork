const API_KEY = "c28b86768a874c70b1ecd1343e8f0f24";

// Funcția pentru a obține datele meteo pentru un oraș
export const fetchWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
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
      timezoneOffset: data.timezone, // Pentru a calcula ora locală în oraș
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

// Funcția pentru a obține date meteo bazate pe coordonatele geografice (latitudine și longitudine)
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

// Funcția pentru a obține sugestii de orașe pe baza unui nume parțial
export const fetchCitySuggestions = async (cityName) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${cityName}&type=like&sort=population&cnt=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Error fetching city suggestions");
    }

    const data = await response.json();
    return data.list.map((city) => ({
      name: city.name,
      country: city.sys.country,
    }));
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};
