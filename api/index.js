import express from "express";
import bodyParser from "body-parser";
import usuarioRoutes from "./routes/usuario.routes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use("/usuarios", usuarioRoutes);

export default app;