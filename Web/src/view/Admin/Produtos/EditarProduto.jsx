import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './CadastrarProduto.css';

const EditarProduto = () => {
  const { idProduto } = useParams();
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/produtos/${idProduto}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Dados do Produto:', data);
        setNome(data.produto.nomeProd || '');
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setErrorMessage('Erro ao buscar produto.');
      }
    };

    fetchProduto();
  }, [idProduto]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nomeProd', nome);
    if (imagem) {
      formData.append('foto_produto', imagem);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/produtos/${idProduto}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate('/admin/produtos', { state: { showEditSuccessPopup: true } });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.erro || 'Erro ao editar produto.');
        console.error('Erro ao editar produto:', errorData);
      }
    } catch (error) {
      setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
    }
  };

  return (
    <div className='cadastro-produto'>
      <div className='container-cima'>
        <nav className='nav-admin'>
          <Link to='/'><img src='/imgs/Fergalicci-preto.png' alt="Fergalicci" className="logo-admin" /></Link>
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
                onChange={handleImageChange}
              />
            </div>
          </div>
          
          <div className="container-baixo">
            <Link className='btn-ctr' to='/admin/produtos'>Cancelar</Link>
            <button type="submit" className='btn-ctr'>Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarProduto;