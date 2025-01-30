import React from 'react'
import { useParams } from 'react-router-dom';

const EditarPostagem = () => {
  const { idPostagem } = useParams();

  return (
    <div>EditarPostagens {idPostagem}</div>
  )
}

export default EditarPostagem