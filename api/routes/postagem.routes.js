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
  upload.single("foto_postagem"),
  postagemController.createPostagem
);

router.get("", postagemController.readPostagens);

router.get(
  "/:idPostagem",
  token.authenticateAccessToken,
  checkAdminPrivileges,
  postagemController.readPostagem
);

router.get(
  "/dependencias",
  token.authenticateAccessToken,
  checkAdminPrivileges,
  postagemController.readDependencias
);

router.delete(
  "/:idPostagem",
  token.authenticateAccessToken,
  checkAdminPrivileges,
  postagemController.deletePostagem
);
router.put(
  "/:idPostagem",
  token.authenticateAccessToken,
  checkAdminPrivileges,
  upload.single("foto_produto"),
  postagemController.updatePostagem
);

export default router;
