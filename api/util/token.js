import jwt from "jsonwebtoken";

function generateAccessToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: "10h" });
}

function authenticateAccessToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null || token === undefined)
    return res.status(401).json({ erro: "Token não informado" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).json({ erro: "Token inválido" });
    } else {
      req.decode = decode;
      return next();
    }
  });
}

export default { generateAccessToken, authenticateAccessToken };
