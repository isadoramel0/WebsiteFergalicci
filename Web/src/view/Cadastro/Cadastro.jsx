import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (event) => {
    event.preventDefault();
    console.log("Tentando cadastro...");

    const cadastroData = {
      nomeUsuario: event.target.nome.value,
      email: event.target.email.value,
      senha: event.target.password.value,
      confirmacaoSenha: event.target.confirmPassword.value,
    };

    console.log("Dados do formulário:", cadastroData);

    try {
      const response = await fetch("http://localhost:3000/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cadastroData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redireciona para a página de login
        navigate("/login");
      } else {
        // Exibe mensagem de erro recebida do servidor
        setError(data.erros ? data.erros : ["Erro ao realizar cadastro."]);
      }
    } catch (err) {
      console.error("Erro ao conectar ao servidor:", err);
      setError("Erro de conexão. Tente novamente mais tarde.");
    }
  };

  return (
    <div className='cadastro'>
      <form className='forms' onSubmit={handleCadastro}>
        <div className="intro-cadastro">
          <Link to="/" ><img className='logo-cadastro' src="imgs/Fergalicci-preto.png" alt="Fergalicci" /></Link>
          <p>Cadastro</p>
        </div>

        <div className="campos">
          <div className="modal-input">
            <input
              type="text"
              name="nome"
              placeholder='  Nome'
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="modal-input">
            <input
              type="email"
              name="email"
              placeholder='  E-mail'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="modal-input">
            <input
              type="password"
              name="password"
              placeholder='  Senha'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="modal-input">
            <input
              type="password"
              name="confirmPassword"
              placeholder='  Confirmar sua senha'
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {error && error.map((err, index) => <p key={index} className="error-message">{err}</p>)}

        <button type='submit' className='btn-cadastro'>Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;