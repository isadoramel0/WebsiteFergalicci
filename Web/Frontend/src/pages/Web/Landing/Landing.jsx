import React, { useEffect, useState } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

function Landing() {
  const posts = [
    {
      img: 'imgs/image-post.png',
      title: 'Nome da postagem 1',
      description: 'tema da postagem resumo 1',
    },
    {
      img: 'imgs/image-post.png',
      title: 'Nome da postagem 2',
      description: 'tema da postagem resumo 2',
    },
    {
      img: 'imgs/image-post.png',
      title: 'Nome da postagem 3',
      description: 'tema da postagem resumo 3',
    },
    {
      img: 'imgs/image-post.png',
      title: 'Nome da postagem 4',
      description: 'tema da postagem resumo 4',
    },
  ];

  const [carouselX, setCarouselX] = useState(0);
  const controls = useAnimation();

  // Faz o carrossel deslizar automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselX(prev => prev - 300); // Move 300px para a esquerda
    }, 3000); // A cada 3 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  useEffect(() => {
    controls.start({
      x: carouselX,
      transition: { duration: 1, ease: "easeInOut" },
    });
    if (carouselX <= -posts.length * 300) {
      setCarouselX(0); // Reinicia o carrossel quando chega ao fim
    }
  }, [carouselX, controls, posts.length]);

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

        {/* Carrossel animado */}
        <motion.div
          className="carrossel"
        >
          <motion.div
            className="carrossel-inner"
            animate={controls}
          >
            {posts.map((post, index) => (
              <motion.div className="post" key={index}>
                <img src={post.img} alt={`Post ${index}`} />
                <p className="titulo">{post.title}</p>
                <p className="descricao">{post.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
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
        <p>Fergalicci corporativa de moda | Av. Beltrano de Cicrano nº 254</p>
      </footer>
    </div>
  );
}

export default Landing;
