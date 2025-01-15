import express from "express";
import usuarioController from "../controllers/usuario.controller.js";

const router = express.Router();

router.post("/cadastrar", usuarioController.createUsuario);

export default router;