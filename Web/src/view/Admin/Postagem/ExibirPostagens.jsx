import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination.jsx';
import PopUpExcluir from '../../../components/PopUpExcluir/PopUpExcluir.jsx';
import logo from '../../../../public/imgs/Fergalicci-preto.png';  
import lupa from '../../../../public/imgs/Lupa.png';
import iconeLapis from '../../../../public/imgs/IconeLápis.png';
import iconeLixeira from '../../../../public/imgs/IconeLixeira.png';
import './ExibirPostagens.css'

const ExibirPostagens = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [postagens, setPostagens] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [postagemToDelete, setPostagemToDelete] = useState(null);
  const [showPopUpExcluir, setShowPopUpExcluir] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(location.state?.showSuccessPopup || false);
  const postagensPorPagina = 5;

  useEffect(() => {
    const fetchPostagens = async () => {
      try {
        const token = localStorage.getItem('token');
        const idUsuario = localStorage.getItem('idUsuario');
        const admin = localStorage.getItem('admin');

        // console.log('Token:', token);
        // console.log('idUsuario:', idUsuario);
        // console.log('Admin:', admin);
        
        const response = await fetch(`http://localhost:3000/postagens`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPostagens(data.postagens);
        console.log(data.postagens);
      } catch (error) {
        console.error('Erro ao buscar postagens:', error);
      }
    };

    fetchPostagens();
  }, [paginaAtual]);

  const handleEdit = (idPostagem) => {
    navigate(`/admin/postagens/editar/${idPostagem}`);
  };

  const handleDelete = async (idPostagem) => {
    setPostagemToDelete(idPostagem);
    setShowPopUpExcluir(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:3000/postagens/${postagemToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPostagens(postagens.filter(postagem => postagem.idPostagem !== postagemToDelete));
      setShowPopUpExcluir(false);
      setPostagemToDelete(null);
    } catch (error) {
      console.error('Erro ao deletar postagem:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPaginaAtual(1); // volta para página 1 quando procurar
  };

  const filteredPostagens = postagens.filter((postagem) =>
    postagem.tituloPost && postagem.tituloPost.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPostagem = paginaAtual * postagensPorPagina;
  const indexOfFirstPostagem = indexOfLastPostagem - postagensPorPagina;
  const currentFilteredPostagens = filteredPostagens.slice(indexOfFirstPostagem, indexOfLastPostagem);

  const paginate = (pageNumber) => setPaginaAtual(pageNumber);

  return (
    <div className='admin-postagens'>
      <nav className='nav-admin'>
        <Link to='/'><img src={logo} alt="Fergalicci" className="logo-admin" /></Link>
        <h3>Administrador</h3>
      </nav>

      <div className="titulo-postagens">
        <h1>Postagens</h1>
      </div>

      <div className="fundo-tela">
        <div className="container-tabela">
          <div>
            <div className="extras-tabela">
              <div className="busca">
                <img src={lupa} alt="Icone Lupa" />
                <input
                  className='buscar'
                  type="text"
                  placeholder='  Busque uma postagem'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <Link to='/admin/postagens/add'>
                <button className='btn-add-postagem'>Adicionar</button>
              </Link>
            </div>
            <div className="div-tabela">
              <table className='tabela'>
                <thead className='cabecalho'>
                  <tr>
                    <th>Nome da postagem</th>
                  </tr>
                </thead>
                <tbody className='corpo-tabela'>
                  {currentFilteredPostagens.map((postagem, index) => (
                    <tr key={postagem.idPostagem || index}>
                      <td>
                        <p className="nome-postagem">{postagem.tituloPost}</p>
                        <div className="botoes">
                          <button onClick={() => handleEdit(postagem.idPostagem)} className='btn-editar'>Editar
                            <img className='icones' src={iconeLapis} alt="Icone Lápis" />
                          </button>
                          <button onClick={() => handleDelete(postagem.idPostagem)} className="btn-excluir">Excluir
                            <img className='icones' src={iconeLixeira} alt="Icone Lixeira" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            produtosPorPagina={postagensPorPagina}
            totalProdutos={filteredPostagens.length}
            paginate={paginate}
            paginaAtual={paginaAtual}
          />
        </div>
      </div>

      <PopUpExcluir
        show={showPopUpExcluir}
        onClose={() => setShowPopUpExcluir(false)}
        onConfirm={confirmDelete}
      />

      {showSuccessPopup && (
        <div className="popup-success">
          <div className="aviso">Aviso</div>
          <p>Item cadastrado com sucesso!</p>
          <button onClick={() => setShowSuccessPopup(false)}>OK</button>
        </div>
      )}
    </div>
  );
}

export default ExibirPostagens;