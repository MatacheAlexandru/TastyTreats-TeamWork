import React from "react";
import "./FavoriteButton.css";

function FavoriteButton({ onClick }) {
  return (
    <button className="add-favorite-button" onClick={onClick}>
      Adaugă la favorite
    </button>
  );
}

export default FavoriteButton;
