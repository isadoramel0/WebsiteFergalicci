import express from "express";
import token from "../util/token.js";
import upload from "../util/fileHandler.js";
import checkAdminPrivileges from "../util/checkAdminPrivileges.js";

const router = express.Router();

router.post(
  "",
  token.authenticateAccessToken,
  checkAdminPrivileges,
  upload.single("foto_produto"),
  (req, res) => {return res.send("Rota para cadastro de postagens")}
);

export default router;
