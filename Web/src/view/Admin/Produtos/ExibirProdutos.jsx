import React from 'react';
import './ExibirProdutos.css';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination.jsx';
import logo from '../../../../public/imgs/Fergalicci-preto.png';  
import lupa from '../../../../public/imgs/Lupa.png';
import iconeLapis from '../../../../public/imgs/IconeLápis.png';
import iconeLixeira from '../../../../public/imgs/IconeLixeira.png';

const ExibirProdutos = () => {
  const navigate = useNavigate();

  const handleEdit = (produtoId) => {
    navigate(`/admin/produtos/editar/${produtoId}`);
  };

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
                <input className='buscar' type="text" placeholder='  Busque um produto' />
              </div>
              <Link to='/admin/produtos/add'>
                <button
                  className='btn-add-produto'>Adicionar</button>
              </Link>
            </div>
            <div className="div-tabela">
              <table className='tabela'>
                <thead className='cabecalho'>
                  <tr>
                    <th>Nome do Produto</th>
                  </tr>
                </thead>
                <tbody className='corpo-tabela'>
                  <tr>
                    <td>
                      <p className="nome-produto">Nome Produto 3</p>
                      <div className="botoes">
                        <button onClick={() => handleEdit(3)} className='btn-editar'>Editar
                          <img className='icones' src={iconeLapis}  alt="Icone Lápis" />
                        </button>
                        <button className="btn-excluir">Excluir
                          <img className='icones' src={iconeLixeira} alt="Icone Lixeira" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="nome-produto">Nome Produto 3</p>
                      <div className="botoes">
                        <button className='btn-editar'>Editar
                          <img className='icones' src={iconeLapis} alt="Icone Lápis" />
                        </button>
                        <button className="btn-excluir">Excluir
                          <img className='icones' src={iconeLixeira} alt="Icone Lixeira" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="nome-produto">Nome Produto 3</p>
                      <div className="botoes">
                        <button className='btn-editar'>Editar
                          <img className='icones' src={iconeLapis} alt="Icone Lápis" />
                        </button>
                        <button className="btn-excluir">Excluir
                          <img className='icones' src={iconeLixeira} alt="Icone Lixeira" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="nome-produto">Nome Produto 3</p>
                      <div className="botoes">
                        <button className='btn-editar'>Editar
                          <img className='icones' src={iconeLapis} alt="Icone Lápis" />
                        </button>
                        <button className="btn-excluir">Excluir
                          <img className='icones' src={iconeLixeira} alt="Icone Lixeira" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="nome-produto">Nome Produto 3</p>
                      <div className="botoes">
                        <button className='btn-editar'>Editar
                          <img className='icones' src={iconeLapis} alt="Icone Lápis" />
                        </button>
                        <button className="btn-excluir">Excluir
                          <img className='icones' src={iconeLixeira} alt="Icone Lixeira" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Pagination className='pagination'
          produtosPorPagina = {2}
          totalProdutos = {7}
          paginate = {1}
          paginaAtual = {1}
          />
        </div>
      </div>
    </div>
  )
}

export default ExibirProdutos;