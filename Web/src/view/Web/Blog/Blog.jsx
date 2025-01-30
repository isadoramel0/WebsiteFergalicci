import React, { useEffect, useState } from 'react';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [selectedType, setSelectedType] = useState(true); // Estado para armazenar o tipo selecionado

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/postagens');
        const data = await response.json();
        if (data.postagens) {
          setPosts(data.postagens);
        }
      } catch (error) {
        console.error('Erro ao buscar postagens:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const postElements = document.querySelectorAll('.post-blog');
    postElements.forEach((post, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      let height;

      if (row % 2 === 0) {
        // Linhas pares
        height = col === 1 ? 400 : 450;
      } else {
        // Linhas ímpares
        height = col === 1 ? 450 : 400;
      }

      post.style.height = `${height}px`;
    });
  }, [posts]);

  // Filtrar postagens com base no tipo selecionado
  const filteredPosts = posts.filter(post => post.tipoConteudo === selectedType);

  return (
    <div className='blog'>
      <nav className="nav-blog">
        <img src="imgs/Fergalicci-branco.png" alt="Fergalicci" className="logo-blog" />
        <p className="titulo-blog">BLOG</p>
      </nav>
      <nav className="tipo-post">
        <p
          className={`tipo-moda ${selectedType ? 'selected' : ''}`}
          onClick={() => setSelectedType(true)}
        >
          Moda
        </p>
        <p
          className={`tipo-lifestyle ${!selectedType ? 'selected' : ''}`}
          onClick={() => setSelectedType(false)}
        >
          Lifestyle
        </p>
      </nav>

      <div className="postagens">
        {filteredPosts.map((post, index) => (
          <div key={index} className="post-blog">
            <img src={`/storage/${post.caminhoImg}`} alt="Imagem da postagem" className='img-post-blog' />
            <p className='titulo-post-blog'>{post.tituloPost}</p>
          </div>
        ))}
      </div>

      <footer className='footer-blog'></footer>
    </div>
  );
}

export default Blog;