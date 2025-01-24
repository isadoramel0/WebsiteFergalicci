import React, { useState } from 'react';
import './PopUpExcluir.css';

const PopUpExcluir = ({ show, onClose, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!show) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error('Erro ao excluir:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="engloba-caixa-alerta">
      <div className="caixa-alerta">
        
          <div className="atencao">Atenção</div>
          <p className='text-alert'>Deseja mesmo excluir este item?</p>
          {isLoading && (
            <div className="loader"></div>
          )}
          {!isLoading && (
            <div className="modal-buttons">
              <button
                id="btn-form-cancelar-caixa"
                onClick={onClose}
              >
                Não
              </button>
              <button
                id="btn-salvar-visualizar-caixa"
                onClick={handleConfirm}
              >
                Sim
              </button>
            </div>
          )}
        
      </div>
    </div>
  );
};

export default PopUpExcluir;