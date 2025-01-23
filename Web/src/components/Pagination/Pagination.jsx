import React from 'react';
import './Pagination.css';

const Pagination = ({ produtosPorPagina, totalProdutos, paginate, paginaAtual }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProdutos / produtosPorPagina);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Determine o número inicial e final das páginas a serem exibidas
  let startPage, endPage;
  if (totalPages <= 3) {
    // Menos de 3 páginas no total, então mostrar todas as páginas
    startPage = 1;
    endPage = totalPages;
  } else if (paginaAtual <= 2) {
    // Página atual perto do início
    startPage = 1;
    endPage = 3;
  } else if (paginaAtual + 1 >= totalPages) {
    // Página atual perto do final
    startPage = totalPages - 2;
    endPage = totalPages;
  } else {
    // Página atual em algum lugar no meio
    startPage = paginaAtual - 1;
    endPage = paginaAtual + 1;
  }

  const displayedPageNumbers = pageNumbers.slice(startPage - 1, endPage);

  return (
    <nav className="pagination-wrapper">
      <ul className='pagination'>
        <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              paginate(paginaAtual - 1);
            }}
            href='!#'
            className='page-link'
          >
            &laquo;
          </a>
        </li>
        {displayedPageNumbers.map(number => (
          <li
          key={number}
          className={`page-item ${paginaAtual === number ? 'active' : ''}`}>
            <a
              onClick={(e) => {
                e.preventDefault();
                paginate(number); // Atualiza a página atual
              }}
              href='!#'
              className='page-link'
            >
              {number}
            </a>
          </li>
        ))}
        <li className={`page-item ${paginaAtual === totalPages ? 'disabled' : ''}`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              paginate(paginaAtual + 1);
            }}
            href='!#'
            className='page-link'
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;