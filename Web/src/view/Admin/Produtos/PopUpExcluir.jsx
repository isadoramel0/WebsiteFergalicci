import React, { useState } from 'react';
import '../../../components/PopUpExcluir/PopUpExcluir.css';

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
        <div className="caixa-elementos">
          <img src="img/CaixaAlerta/icone_aviso.png" alt="Icon" />
          <p>Você tem certeza que deseja excluir esse produto?</p>
          {isLoading && (
            <div className="loader"></div>
          )}
          {!isLoading && (
            <div className="modal-buttons">
              <button
                id="btn-form-cancelar-caixa"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                id="btn-salvar-visualizar-caixa"
                onClick={handleConfirm}
              >
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUpExcluir;