import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination.jsx';
import './CadastrarPostagem.css';

const CadastrarPostagem = () => {
  const [tituloPostagem, setTituloPostagem] = useState('');
  const [corpo, setCorpo] = useState('');
  const [imagem, setImagem] = useState(null);
  const [tipoConteudo, setTipoConteudo] = useState(true); 
  const [produtos, setProdutos] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const produtosPorPagina = 5;

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/produtos', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProdutos(data.produtos);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, [paginaAtual]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('tituloPost', tituloPostagem);
    formData.append('corpo', corpo);
    formData.append('foto_postagem', imagem);
    formData.append('tipoConteudo', tipoConteudo);
    formData.append('produtos', JSON.stringify(produtosSelecionados));

    console.log('Dados enviados para o backend:');
    console.log('Título da Postagem:', tituloPostagem);
    console.log('Corpo:', corpo);
    console.log('Imagem:', imagem);
    console.log('Tipo de Conteúdo:', tipoConteudo);
    console.log('Produtos Selecionados:', produtosSelecionados);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/postagens', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate('/admin/postagens', { state: { showSuccessPopup: true } });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.erro || 'Erro ao cadastrar postagem.');
        console.error('Erro ao cadastrar postagem:', errorData);
      }
    } catch (error) {
      setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  const handleProdutoChange = (idProduto) => {
    setProdutosSelecionados((prevSelecionados) => {
      if (prevSelecionados.includes(idProduto)) {
        return prevSelecionados.filter((id) => id !== idProduto);
      } else {
        return [...prevSelecionados, idProduto];
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPaginaAtual(1); // volta para página 1 quando procurar
  };

  const filteredProdutos = produtos.filter((produto) =>
    produto.nomeProd && produto.nomeProd.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduto = paginaAtual * produtosPorPagina;
  const indexOfFirstProduto = indexOfLastProduto - produtosPorPagina;
  const currentFilteredProdutos = filteredProdutos.slice(indexOfFirstProduto, indexOfLastProduto);

  const paginate = (pageNumber) => setPaginaAtual(pageNumber);

  return (
    <div className='cadastro-postagem'>
      <div className='container-cima'>
        <nav className='nav-admin'>
          <Link to='/'><img src='/imgs/Fergalicci-preto.png' alt="Fergalicci" className="logo-admin" /></Link>
          <h3>Administrador</h3>
        </nav>
        <div className="titulo-postagens">
          <h1>Postagem</h1>
        </div>
      </div>

      <div className="inputs-cadastro">
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="form-cadastro-postagem">
            <div className="input-nome">
              <label htmlFor="tituloPost">Título da postagem</label>
              <input
                className='btn-tituloPost'
                type="text"
                id="tituloPost"
                name="tituloPost"
                value={tituloPostagem}
                onChange={(e) => setTituloPostagem(e.target.value)}
                required
              />
            </div>

            <div className="input-corpo">
              <label htmlFor="corpo">Corpo da postagem</label>
              <textarea
                className='btn-corpo'
                id="corpo"
                name="corpo"
                value={corpo}
                onChange={(e) => setCorpo(e.target.value)}
                required
              />
            </div>

            <div className="input-tipo">
              <label htmlFor="tipoConteudo">Tipo de conteúdo</label>
              <div className="tipo-conteudo">
                <label className={`tipo-option ${tipoConteudo === true ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="tipoConteudo"
                    value={true}
                    checked={tipoConteudo === true}
                    onChange={() => setTipoConteudo(true)}
                  />
                  Moda
                </label>
                <label className={`tipo-option ${tipoConteudo === false ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="tipoConteudo"
                    value={false}
                    checked={tipoConteudo === false}
                    onChange={() => setTipoConteudo(false)}
                  />
                  Lifestyle
                </label>
              </div>
            </div>

            <div className="input-img">
              <label htmlFor="imagem_postagem">Imagem</label>
              <label className='btn-img-label' htmlFor="img">Realizar upload de imagem</label>
              <input
                className='btn-img'
                type="file"
                id="img"
                name="foto_postagem"
                onChange={(e) => setImagem(e.target.files[0])}
                required
              />
            </div>

            <div className='produtos-relacionados'><label>Produtos relacionados</label></div>
            <div className="input-produtos">
              <div className="busca">
                <img className='icone-lupa' src='../../../../public/imgs/Lupa.png' alt="Icone Lupa" />
                <input
                  className='buscar'
                  type="text"
                  placeholder='  Busque um produto'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <table className='tabela'>
                <thead className='cabecalho'>
                  <tr>
                    <th className='nomes-produtos'>Nome do produto</th>
                  </tr>
                </thead>
                <tbody className='corpo-tabela'>
                  {currentFilteredProdutos.map((produto) => (
                    <tr key={produto.idProduto} >
                      <td>{produto.nomeProd}</td>
                      <td className='selecionar'>
                        <span>Selecionar</span>
                        <input
                          type="checkbox"
                          className="checkbox-custom"
                          checked={produtosSelecionados.includes(produto.idProduto)}
                          onChange={() => handleProdutoChange(produto.idProduto)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                produtosPorPagina={produtosPorPagina}
                totalProdutos={filteredProdutos.length}
                paginate={paginate}
                paginaAtual={paginaAtual}
              />
            </div>
          </div>
          
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
          <div className="container-baixo">
            <Link className='btn-ctr' to='/admin/postagens'>Cancelar</Link>
            <button type="submit" className='btn-ctr'>Publicar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastrarPostagem;