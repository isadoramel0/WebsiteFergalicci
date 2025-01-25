import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Landing from './view/Web/Landing/Landing.jsx'; 
import Cadastro from './view/Cadastro/Cadastro.jsx';
import Login from './view/Login/Login.jsx';
import Blog from './view/Web/Blog/Blog.jsx';
import AdminRoutes from './components/AdminRoutes.jsx';
import Admin from './view/Admin/PrincipalAdmin.jsx';
import Produtos from './view/Admin/Produtos/ExibirProdutos.jsx';
import Postagens from './view/Admin/Postagem/ExibirPostagens.jsx';
import AddProduto from './view/Admin/Produtos/CadastrarProduto.jsx';
import EditarProduto from './view/Admin/Produtos/EditarProduto.jsx';
import AddPostagem from './view/Admin/Postagem/CadastrarPostagem.jsx';
import EditarPostagem from './view/Admin/Postagem/EditarPostagem.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path='/blog' element={<Blog />} />

        <Route path="/admin" element={<AdminRoutes />}>
          <Route index element={<Admin />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="produtos/add" element={<AddProduto />} />
          <Route path="produtos/editar/:idProduto" element={<EditarProduto />} />

          <Route path="postagens" element={<Postagens />} />
          <Route path="postagens/add" element={<AddPostagem />} />
          <Route path="produtos/editar/:idPostagem" element={<EditarPostagem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
