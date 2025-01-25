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
router.get(
  "",
  token.authenticateAccessToken,
  checkAdminPrivileges,
  postagemController.readPostagens
);

router.delete(
  "/:idPostagem",
  token.authenticateAccessToken,
  checkAdminPrivileges,
  postagemController.deletePostagem
)

export default router;
