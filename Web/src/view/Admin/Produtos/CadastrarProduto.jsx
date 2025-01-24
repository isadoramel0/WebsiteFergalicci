import React, { useState } from 'react';
import './CadastrarProduto.css';
import { Link, useNavigate } from 'react-router-dom';

const CadastrarProduto = () => {
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nomeProd', nome);
    formData.append('foto_produto', imagem);

    console.log('Dados enviados para o backend:');
    console.log('Nome do Produto:', nome);
    console.log('Imagem:', imagem);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate('/admin/produtos', { state: { showSuccessPopup: true } });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.erro || 'Erro ao cadastrar produto.');
        console.error('Erro ao cadastrar produto:', errorData);
      }
    } catch (error) {
      setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  return (
    <div className='cadastro-produto'>
      <div className='container-cima'>
        <nav className='nav-admin'>
          <Link to='/'><img src='../../../../public/imgs/Fergalicci-preto.png' alt="Fergalicci" className="logo-admin" /></Link>
          <h3>Administrador</h3>
        </nav>
        <div className="titulo-produtos">
          <h1>Produto</h1>
        </div>
      </div>

      <div className="inputs-cadastro">
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="form-cadastro">
            <div className="input-nome">
              <label htmlFor="nome">Nome</label>
              <input
                className='btn-nome'
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="input-img">
              <label htmlFor="imagem_produto">Imagem</label>
              <label className='btn-img-label' htmlFor="img">Realizar upload de imagem</label>
              <input
                className='btn-img'
                type="file"
                id="img"
                name="foto_produto"
                onChange={(e) => setImagem(e.target.files[0])}
                required
              />
            </div>
          </div>
          
          <div className="container-baixo">
            <Link className='btn-ctr' to='/admin/produtos'>Cancelar</Link>
            <button type="submit" className='btn-ctr'>Cadastrar</button>
          </div>
        </form>
      </div>

      {errorMessage && (
        <div className="popup-error">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default CadastrarProduto;