import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";

import usuarioRoutes from "./routes/usuario.routes.js";
import produtoRoutes from "./routes/produto.routes.js";
import postagemRoutes from "./routes/postagem.routes.js";

env.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/usuarios", usuarioRoutes);
app.use("/produtos", produtoRoutes);
app.use("/postagens", postagemRoutes);

export default app;
