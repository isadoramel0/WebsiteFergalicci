import express from "express";
import produtoController from "../controllers/produto.controller.js";
import token from "../util/token.js";

const router = express.Router();

router.post("", token.authenticateAccessToken, produtoController.createProduto);

export default router;