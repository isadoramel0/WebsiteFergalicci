import usuarioServices from "../services/usuario.services.js";

async function createUsuario(req, res){
    if (req.body === undefined){
        return res.status(400).json({erro: "Requisição inválida"});
    }

    const novoUsuario = {
        nomeUsuario: req.body.nomeUsuario,
        email: req.body.email,
        senha: req.body.senha,
        confirmacaoSenha: req.body.confirmacaoSenha
    }

    // Validação de dados
    let erros = []; // Acumula os erros na validação dos dados

    if(novoUsuario.senha !== novoUsuario.confirmacaoSenha){
        erros.push("A confirmação de senha não corresponde à senha informada");
    }
    if (novoUsuario.senha.length < 8){
        erros.push("A senha deve conter no mínimo 8 caracteres");
    }
    const reLetras = /[a-zA-Z]/;
    if (!reLetras.test(novoUsuario.senha)){
        erros.push("A senha deve conter ao menos uma letra");
    }
    const reNumeros = /[0-9]/;
    if (!reNumeros.test(novoUsuario.senha)){
        erros.push("A senha deve conter ao menos um número");
    }

    // Retorna todos os erros durante a validação de dados
    if (erros.length > 0){
        return res.status(400).json({erros: erros});
    } else {
        // Chama os serviços para verificar as regras de negócio
        const dados = await usuarioServices.createUsuario(novoUsuario);
        return res.status(201).json(dados);
    }
}

export default { createUsuario }