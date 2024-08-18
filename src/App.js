import React from "react";
import SearchBar from "./components/header/searchBarSections/searchBar/SearchBar";
import WeatherCard from "./components/main/weathercard/weathercard"; // Importăm WeatherCard
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <SearchBar /> {/* Adaugă SearchBar în header */}
      </header>
      <main>
        <WeatherCard /> {/* Adaugă WeatherCard în main */}
      </main>
    </div>
  );
}

export default App;
