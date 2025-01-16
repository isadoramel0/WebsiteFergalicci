import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

function generateAccessToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: "10h" });
}

function authenticateAccessToken(req, res, next) {
    const token = req.body.token;

    if (token === null) return res.sendStatus(401).error({erro: "Token não informado"});

    jwt.verify(token, process.env.TOKEN_SECRET, (err, email) => {
        if (err) return res.sendStatus(403).error({erro: "Token inválido"});
        req.email = email;
        next();
    });
}

export default { generateAccessToken, authenticateAccessToken};
