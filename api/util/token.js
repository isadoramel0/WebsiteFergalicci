import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

function generateAccessToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: "10h" });
}

export default { generateAccessToken };
