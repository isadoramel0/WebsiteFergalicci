import usuarioServices from "../services/usuario.services.js";
import token from "../util/token.js";

async function createUsuario(req, res) {
  const novoUsuario = {
    nomeUsuario: req.body.nomeUsuario,
    email: req.body.email,
    senha: req.body.senha,
    confirmacaoSenha: req.body.confirmacaoSenha,
  };

  // Validação de dados
  let erros = []; // Acumula os erros na validação dos dados

  if (novoUsuario.senha !== novoUsuario.confirmacaoSenha) {
    erros.push("A confirmação de senha não corresponde à senha informada");
  }
  if (novoUsuario.senha.length < 8) {
    erros.push("A senha deve conter no mínimo 8 caracteres");
  }
  const reLetras = /[a-zA-Z]/;
  if (!reLetras.test(novoUsuario.senha)) {
    erros.push("A senha deve conter ao menos uma letra");
  }
  const reNumeros = /[0-9]/;
  if (!reNumeros.test(novoUsuario.senha)) {
    erros.push("A senha deve conter ao menos um número");
  }

  // Retorna todos os erros durante a validação de dados
  if (erros.length > 0) {
    return res.status(400).json({ erros: erros });
  } else {
    // Chama os serviços para verificar as regras de negócio
    const dados = await usuarioServices.createUsuario(novoUsuario);
    return res.status(201).json(dados);
  }
}

async function loginUsuario(req, res) {
  const usuario = {
    email: req.body.email,
    senha: req.body.senha,
  };

  // Busca se o usuário existe no banco de dados
  console.log(usuario);
  const dados = await usuarioServices.loginUsuario(usuario);

  if (dados === null || usuario.senha !== dados.senha) {
    return res
      .status(401)
      .json({
        erro: "E-mail ou senha incorretos. Verifique e tente novamente.",
      });
  }

  // Se os dados coincidem, gera um JWT e retorna
  const jwtUsuario = await token.generateAccessToken(dados);
  return res.status(200).json({ token: jwtUsuario });
}

export default { createUsuario, loginUsuario };
