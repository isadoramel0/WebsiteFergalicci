import usuarioRepository from "../repositories/usuario.repository.js";

export default async function checkAdminPrivileges(req, res, next) {
  const idUsuario = req.body.idUsuario || req.decode.idUsuario;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!idUsuario) {
    return res.status(401).json({ erro: "Usuário não informado" });
  }

  const conferencia = await usuarioRepository.getTokenUsuario(idUsuario);

  if(!conferencia){
    return res
      .status(403)
      .json({ erro: "Usuário não encontrado" });
  }

  if (conferencia.token === token && conferencia.admin) {
    return next();
  } else {
    return res
      .status(403)
      .json({ erro: "Usuário não possui o nível de privilégio necessário" });
  }
}
