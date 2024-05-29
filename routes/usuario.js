const express = require("express");
const router = express.Router();
const cusuario = require("../controlers/usuario");
const auth = require("../auth");
const multer = require("multer");

router.get("/lista", cusuario.listado);

router.put("/insertar", cusuario.insertar);

router.delete("/borrar", auth.verificatoken, cusuario.borrar);

router.post("/actualizar", auth.verificatoken, cusuario.actualizar);
/* 
router.get('/lista',cusuario.listado);

router.put('/insertar', cusuario.insertar);

router.delete('/borrar', cusuario.borrar);

router.post('/actualizar', cusuario.actualizar); */

router.post("/login", cusuario.verificar);

module.exports = router;
