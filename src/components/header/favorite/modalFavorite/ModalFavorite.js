import React from "react";

function ModalFavorite({ favorites, onClose, onSelectFavorite }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Orașe favorite</h3>
        <ul>
          {favorites.map((city, index) => (
            <li key={index} onClick={() => onSelectFavorite(city)}>
              {city}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Închide</button>
      </div>
    </div>
  );
}

export default ModalFavorite;
