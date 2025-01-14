import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <nav className="navbar">
        <img src="imgs/Fergalicci-branco.png" alt="Fergalicci" />
        <img src="imgs/Logo.png" alt="Logo" />
      </nav>

      <div className="intro">
        <div className="textos">
            <h1>Explore elegância, desfile sua essência</h1>
            <p>Texto menorzinho mas com significado</p>
        </div>
        <div className="imagem">
            <div className="circulo">
                <img src="imgs/image.png" alt="imagem" />
            </div>
        </div>
      </div>

      <div className="pre-blog">
        <h4>O que você encontra aqui</h4>
        <div className="carrossel">
            <div className="post">
                <img src="imgs/image-post.png" alt="imagem do post" />
                <p className="titulo">Nome da postagem</p>
                <p className="descricao">tema da postagem resumo </p>
            </div>

            <div className="post">
                <img src="imgs/image-post.png" alt="imagem do post" />
                <p className="titulo">Nome da postagem</p>
                <p className="descricao">tema da postagem resumo </p>
            </div>

            <div className="post">
                <img src="imgs/image-post.png" alt="imagem do post" />
                <p className="titulo">Nome da postagem</p>
                <p className="descricao">tema da postagem resumo </p>
            </div>
        </div>
      </div>

      <div className="entrar">
        <Link to="/cadastro">Faça seu cadastro</Link>
        <Link to="/login">Fazer Login</Link>
      </div>

      <div className="espacamento"></div>

      <footer className="footer">
        <div className="logos">
            <img src="imgs/Fergalicci-branco.png" alt="Fergalicci" />
            <img src="imgs/Logo.png" alt="Logo" />
        </div>
        <p>Fergalicci corporativa de moda | Av. Beltrano de Cicrano nº 254 </p>
      </footer>
    </div>
  );
}

export default Landing;
