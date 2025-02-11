import React, { useEffect, useState } from 'react';
import './ExibirProdutos.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination.jsx';
import PopUpExcluir from '../../../components/PopUpExcluir/PopUpExcluir.jsx';
import PopUpSucesso from '../../../components/PopUpSucesso/PopUpSucesso.jsx';

const ExibirProdutos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [produtoToDelete, setProdutoToDelete] = useState(null);
  const [showPopUpExcluir, setShowPopUpExcluir] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(location.state?.showSuccessPopup || false);
  const [showEditSuccessPopup, setShowEditSuccessPopup] = useState(location.state?.showEditSuccessPopup || false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showDeleteSuccessPopup, setShowDeleteSuccessPopup] = useState(false);
  const produtosPorPagina = 5;

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem('token');
        const idUsuario = localStorage.getItem('idUsuario');
        const admin = localStorage.getItem('admin');

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
    navigate(`/admin/produtos/editar/${idProduto}`, { state: { showEditSuccessPopup: true } });
  };

  const handleDelete = async (idProduto) => {
    setProdutoToDelete(idProduto);
    setShowPopUpExcluir(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');

      // Verificar dependências
      const dependenciasResponse = await fetch(`http://localhost:3000/postagens/dependencias`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const dependenciasData = await dependenciasResponse.json();
      const dependencias = dependenciasData.dependencias;

      const produtoAssociado = dependencias.some(dep => dep.idProduto === produtoToDelete);

      if (produtoAssociado) {
        setShowErrorPopup(true);
        setShowPopUpExcluir(false);
        return;
      }

      // Excluir produto se não houver dependências
      const response = await fetch(`http://localhost:3000/produtos/${produtoToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log("Resposta da exclusão:", result);

      if (result.mensagem === "Produto deletado com sucesso") {
        setShowErrorPopup(false);
        setProdutos(produtos.filter(produto => produto.idProduto !== produtoToDelete));
        setShowDeleteSuccessPopup(true);
      } else {
        setShowErrorPopup(true);
      }

      setShowPopUpExcluir(false);
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
        <Link to='/'><img src={'../../../../public/imgs/Fergalicci-preto.png'} alt="Fergalicci" className="logo-admin" /></Link>
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
                <img src={'../../../../public/imgs/Lupa.png'} alt="Icone Lupa" />
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
                            <img className='icones' src={'../../../../public/imgs/IconeLápis.png'} alt="Icone Lápis" />
                          </button>
                          <button onClick={() => handleDelete(produto.idProduto)} className="btn-excluir">Excluir
                            <img className='icones' src={'../../../../public/imgs/IconeLixeira.png'} alt="Icone Lixeira" />
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

      <PopUpSucesso
        show={showSuccessPopup}
        message="Item cadastrado com sucesso!"
        onClose={() => setShowSuccessPopup(false)}
      />

      <PopUpSucesso
        show={showDeleteSuccessPopup}
        message="Produto deletado com sucesso!"
        onClose={() => setShowDeleteSuccessPopup(false)}
      />

      <PopUpSucesso
        show={showEditSuccessPopup}
        message="Produto editado com sucesso!"
        onClose={() => setShowEditSuccessPopup(false)}
      />

      {showErrorPopup && (
        <div className="engloba-caixa-alerta">
          <div className="caixa-alerta">
            <div className="atencao">Aviso</div>
            <p className="text-alert">Não é possível excluir o produto, pois ele está associado a uma postagem.</p>
            <div className="modal-buttons">
              <button id="btn-salvar-visualizar-caixa" onClick={() => setShowErrorPopup(false)}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExibirProdutos;