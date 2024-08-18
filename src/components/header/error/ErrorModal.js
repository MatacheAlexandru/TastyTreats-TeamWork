import React from "react";
export const handleCloseErrorModal = (setShowErrorModal) => {
  setShowErrorModal(false);
};

function ErrorModal({ error, handleCloseErrorModal }) {
  return (
    <div className="error-modal">
      <div className="modal-content">
        <p>{error}</p>
        <button onClick={handleCloseErrorModal}>Închide</button>
      </div>
    </div>
  );
}

export default ErrorModal;
