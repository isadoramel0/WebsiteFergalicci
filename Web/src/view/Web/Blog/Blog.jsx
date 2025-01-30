import React, { useEffect } from 'react';
import './Blog.css';

const Blog = () => {
  const posts = [
    {
      img: 'imgs/image-post.png',
      tituloPost: 'Nome da postagem 1',
      corpo: 'tema da postagem resumo 1',
    },
    {
      img: 'imgs/image-post.png',
      tituloPost: 'Nome da postagem 2',
      corpo: 'tema da postagem resumo 2',
    },
    {
      img: 'imgs/image-post.png',
      tituloPost: 'Nome da postagem 3',
      corpo: 'tema da postagem resumo 3',
    },
    {
      img: 'imgs/image-post.png',
      tituloPost: 'Nome da postagem 4',
      corpo: 'tema da postagem resumo 4',
    },
    {
      img: 'imgs/image-post.png',
      tituloPost: 'Nome da postagem 5',
      corpo: 'tema da postagem resumo 5',
    },
    {
      img: 'imgs/image-post.png',
      tituloPost: 'Nome da postagem 6',
      corpo: 'tema da postagem resumo 6',
    }
  ];

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
  }, []);

  return (
    <div className='blog'>
      <nav className="nav-blog">
        <img src="imgs/Fergalicci-branco.png" alt="Fergalicci" className="logo-blog" />
        <p className="titulo-blog">BLOG</p>
      </nav>
      <nav className="tipo-post">
        <p className='tipo-moda'>Moda</p>
        <p className='tipo-lifestyle'>Lifestyle</p>
      </nav>

      <div className="postagens">
        {posts.map((post, index) => (
          <div key={index} className="post-blog">
            <img src={post.img} alt="Imagem da postagem" className='img-post-blog' />
            <p className='titulo-post-blog'>{post.tituloPost}</p>
          </div>
        ))}
      </div>

      <footer className='footer-blog'></footer>
    </div>
  );
}

export default Blog;