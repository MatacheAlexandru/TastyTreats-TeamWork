import React from "react";

function SearchInput({ city, setCity, handleSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      handleSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Caută un oraș"
      />
      <button type="submit">Caută</button>
    </form>
  );
}

export default SearchInput;
