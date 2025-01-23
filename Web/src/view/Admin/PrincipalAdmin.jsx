import React from 'react'
import './PrincipalAdmin.css'
import { Link } from 'react-router-dom';

const PrincipalAdmin = () => {
  return (
    <div className='admin-inicio'>
        <nav className='nav-admin'>
            <Link to='/'><img src="imgs/Fergalicci-preto.png" alt="Fergalicci" className="logo-admin" /></Link>
            <h3>Administrador</h3>
        </nav>

        <div className="central-admin">
            <h1>Gerencie seu conteúdo</h1>
            <div className="escolha-admin">
                <Link to='/admin/postagens' className='link-admin'>
                    <div className="bloco">
                        <img className='img-selc' src="imgs/img-blog.png" alt="Imagem representando Blog" />
                        <p>Blog</p>
                    </div>
                </Link>

                <Link to='/admin/produtos' className='link-admin'>
                    <div className="bloco produtos">
                        <img className='img-selc' src="imgs/img-produtos.png" alt="Imagem representando Produtos" />
                        <p>Produtos</p>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default PrincipalAdmin