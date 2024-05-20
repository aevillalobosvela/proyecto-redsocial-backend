const express = require('express');
const router = express.Router();
const cusuario = require('../controlers/usuario')

router.get('/lista', cusuario.listado);

router.put('/insertar', cusuario.insertar);

router.delete('/borrar', cusuario.borrar);

router.post('/actualizar', cusuario.actualizar);

module.exports = router 

