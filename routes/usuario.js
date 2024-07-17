const express = require("express");
const router = express.Router();
const cusuario = require("../controlers/usuario");
const cpublicacion = require("../controlers/publicacion");
const ccomentario = require("../controlers/comentario");
const clike = require("../controlers/like");
const auth = require("../auth");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const body = req.body;
    cb(null, `img${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});

const upload = multer({ storage });

//Rutas de usuario

router.get("/lista", cusuario.listado);

router.post("/insertar", upload.single("imagenperfil"), cusuario.insertar);

router.delete("/borrar", cusuario.borrar);

router.post("/actualizar", upload.single("imagenperfil"), cusuario.actualizar);

router.post("/actualizarpass", cusuario.actualizarpass);

router.post("/login", cusuario.verificar);

//Rutas de publicacion

router.get("/plista", cpublicacion.listado);

router.post("/pinsertar", upload.single("imagenpubli"), cpublicacion.insertar);

router.get("/precuperar_user", cpublicacion.user_pub);

router.get("/ptoprecuperar_user", cpublicacion.topuser_pub);

router.get("/pmis_pub", cpublicacion.mis_pub);

router.delete("/peliminar", cpublicacion.eliminar);

//Rutas de comentario

router.get("/clista", ccomentario.listado);

router.get("/cpublista", ccomentario.listado_com);

router.put("/cinsertar", ccomentario.insertar);

//Rutas de interaccion

router.get("/llista", clike.listado);

router.get("/llistado_user", clike.listado_user);

router.put("/linsertar", clike.insertar);

router.put("/lquitar", clike.quitar);

router.get("/lmislikes", clike.mislikes);

module.exports = router;
