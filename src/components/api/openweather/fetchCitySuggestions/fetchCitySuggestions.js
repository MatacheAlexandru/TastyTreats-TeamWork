const API_KEY = "c28b86768a874c70b1ecd1343e8f0f24";

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
