import express from "express";
import token from "../util/token.js";
import upload from "../util/fileHandler.js";
import checkAdminPrivileges from "../util/checkAdminPrivileges.js";
import postagemController from "../controllers/postagem.controller.js";

const router = express.Router();

router.post(
  "",
  token.authenticateAccessToken,
  checkAdminPrivileges,
  upload.single("foto_produto"),
  postagemController.createPostagem
);

export default router;
