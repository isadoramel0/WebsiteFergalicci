import React from 'react';
import { useParams } from 'react-router-dom';

const EditarProduto = () => {
  const { produtoId } = useParams();

  return (
    <div>
      <h1>Editar Produto {produtoId}</h1>
    </div>
  );
}

export default EditarProduto;