import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Landing from './view/Web/Landing/Landing.jsx'; 
import Cadastro from './view/Cadastro/Cadastro.jsx';
import Login from './view/Login/Login.jsx';
import AdminRoutes from './components/AdminRoutes.jsx';
import Admin from './view/Admin/PrincipalAdmin.jsx';
import Produtos from './view/Admin/Produtos/ExibirProdutos.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminRoutes />}>
          <Route index element={<Admin />} />
          <Route path="produtos" element={<Produtos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
