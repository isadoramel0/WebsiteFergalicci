import express from "express";
import produtoController from "../controllers/produto.controller.js";
import token from "../util/token.js";
import upload from "../util/fileHandler.js";

const router = express.Router();

router.post("", token.authenticateAccessToken, upload.single("foto_produto"), produtoController.createProduto);
router.get("/produtos", token.authenticateAccessToken, produtoController.readProdutos())

export default router;
