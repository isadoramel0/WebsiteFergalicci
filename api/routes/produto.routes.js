import express from "express";
import produtoController from "../controllers/produto.controller.js";
import token from "../util/token.js";
import upload from "../util/fileHandler.js";
import checkAdminPrivileges from "../util/checkAdminPrivileges.js";

const router = express.Router();

router.post("", token.authenticateAccessToken, checkAdminPrivileges, upload.single("foto_produto"), produtoController.createProduto);
router.get("", token.authenticateAccessToken, checkAdminPrivileges, produtoController.readProdutos);
router.get("/:id", token.authenticateAccessToken, checkAdminPrivileges, produtoController.readProduto);
router.put("/:id", token.authenticateAccessToken, checkAdminPrivileges, upload.single("foto_produto"), produtoController.updateProduto);

export default router;
