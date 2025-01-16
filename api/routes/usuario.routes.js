import express from "express";
import usuarioController from "../controllers/usuario.controller.js";

const router = express.Router();

router.post("/cadastrar", usuarioController.createUsuario);
router.post("/login", usuarioController.loginUsuario);

export default router;