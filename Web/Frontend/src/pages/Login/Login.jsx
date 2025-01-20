import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Tentando login...");

    const loginData = {
      email: event.target.email.value,
      senha: event.target.password.value,
    };

    console.log("Dados do formulário:", loginData);

    try {
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazena o token JWT no localStorage
        localStorage.setItem("token", data.token);

        // Redireciona para a página blog
        navigate("/");
      } else {
        // Exibe mensagem de erro recebida do servidor
        setError(data.erro || "Erro ao realizar login.");
      }
    } catch (err) {
      console.error("Erro ao conectar ao servidor:", err);
      setError("Erro de conexão. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="login">
      <form className="forms-login" onSubmit={handleLogin}>
        <div className="intro-login">
          <img className="logo-login" src="imgs/Fergalicci-preto.png" alt="Fergalicci" />
        </div>

        <div className="campos-login">
          <div className="modal-input">
            <input
              type="email"
              name="email"
              placeholder="  E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="modal-input">
            <input
              type="password"
              name="password"
              placeholder="  Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-login">Entrar</button>

        <a href="">Esqueci minha senha</a>
      </form>
    </div>
  );
};

export default Login;
