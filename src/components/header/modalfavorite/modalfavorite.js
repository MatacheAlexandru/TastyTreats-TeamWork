import React from "react";
import "./modalfavorite.css";

function ModalFavorite({ favorites, onClose, onSelectFavorite }) {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Orașe Favorite</h2>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {favorites.length === 0 ? (
          <p>Nu ai orașe favorite.</p>
        ) : (
          <ul className="favorite-list">
            {favorites.map((city, index) => (
              <li key={index} onClick={() => onSelectFavorite(city)}>
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ModalFavorite;
