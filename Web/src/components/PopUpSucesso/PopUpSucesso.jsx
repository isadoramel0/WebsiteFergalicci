import React from 'react';
import './PopUpSucesso.css';

const PopUpSucesso = ({ show, message, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-success">
          <div className="aviso">Aviso</div>
          <p>{message}</p>
          <button onClick={onClose}>OK</button>
    </div>
  );
};

export default PopUpSucesso;