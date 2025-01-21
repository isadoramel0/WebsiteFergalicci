import express from "express";
import produtoController from "../controllers/produto.controller.js";
import token from "../util/token.js";
import upload from "../util/fileHandler.js";

const router = express.Router();

router.post("", token.authenticateAccessToken, upload.single("foto_produto"), produtoController.createProduto);
router.get("", token.authenticateAccessToken, produtoController.readProdutos);
router.put("/:id", token.authenticateAccessToken, upload.single("foto_produto"), produtoController.updateProduto);


export default router;
