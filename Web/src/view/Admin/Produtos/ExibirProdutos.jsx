import React, { useEffect, useState } from 'react';
import './ExibirProdutos.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination.jsx';
import PopUpExcluir from '../../../components/PopUpExcluir/PopUpExcluir.jsx';
import logo from '../../../../public/imgs/Fergalicci-preto.png';  
import lupa from '../../../../public/imgs/Lupa.png';
import iconeLapis from '../../../../public/imgs/IconeLápis.png';
import iconeLixeira from '../../../../public/imgs/IconeLixeira.png';

const ExibirProdutos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [produtoToDelete, setProdutoToDelete] = useState(null);
  const [showPopUpExcluir, setShowPopUpExcluir] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(location.state?.showSuccessPopup || false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const produtosPorPagina = 5;

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem('token');
        const idUsuario = localStorage.getItem('idUsuario');
        const admin = localStorage.getItem('admin');

        // console.log('Token:', token);
        // console.log('idUsuario:', idUsuario);
        // console.log('Admin:', admin);
        
        const response = await fetch(`http://localhost:3000/produtos`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProdutos(data.produtos);
        console.log(data.produtos);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, [paginaAtual]);

  const handleEdit = (idProduto) => {
    navigate(`/admin/produtos/editar/${idProduto}`);
  };

  const handleDelete = async (idProduto) => {
    setProdutoToDelete(idProduto);
    setShowPopUpExcluir(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/produtos/${produtoToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log("Resposta da exclusão:", result);
      
      // Atualizar a lógica para controlar o showErrorPopup corretamente
      if (result.mensagem === "Produto deletado com sucesso") {
        setShowErrorPopup(false);
        console.log("Estado showErrorPopup:", showErrorPopup);
        setProdutos(produtos.filter(produto => produto.idProduto !== produtoToDelete));
        setShowErrorPopup(false); // Garantir que o popup de erro seja fechado se a exclusão for bem-sucedida
      } else {
        setShowErrorPopup(true); // Mostrar o popup de erro apenas em caso de falha
      }
      
      setShowPopUpExcluir(false); // Sempre fechar o PopUpExcluir
      setProdutoToDelete(null);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      setShowPopUpExcluir(false);
      setShowErrorPopup(true);
    }
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
    <div className='admin-produtos'>
      <nav className='nav-admin'>
        <Link to='/'><img src={logo} alt="Fergalicci" className="logo-admin" /></Link>
        <h3>Administrador</h3>
      </nav>

      <div className="titulo-produtos">
        <h1>Produtos</h1>
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
                  placeholder='  Busque um produto'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <Link to='/admin/produtos/add'>
                <button className='btn-add-produto'>Adicionar</button>
              </Link>
            </div>
            <div className="div-tabela">
              <table className='tabela'>
                <thead className='cabecalho'>
                  <tr>
                    <th>Nome do produto</th>
                  </tr>
                </thead>
                <tbody className='corpo-tabela'>
                  {currentFilteredProdutos.map((produto, index) => (
                    <tr key={produto.idProduto || index}>
                      <td>
                        <p className="nome-produto">{produto.nomeProd}</p>
                        <div className="botoes">
                          <button onClick={() => handleEdit(produto.idProduto)} className='btn-editar'>Editar
                            <img className='icones' src={iconeLapis} alt="Icone Lápis" />
                          </button>
                          <button onClick={() => handleDelete(produto.idProduto)} className="btn-excluir">Excluir
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
            produtosPorPagina={produtosPorPagina}
            totalProdutos={filteredProdutos.length}
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

      {showErrorPopup && (
        <div className="popup-success">
          <div className="aviso">Aviso</div>
          <p>Não é possível excluir o produto, pois ele está associado a uma postagem.</p>
          <button onClick={() => setShowErrorPopup(false)}>OK</button>
        </div>
      )}
    </div>
  );
}

export default ExibirProdutos;