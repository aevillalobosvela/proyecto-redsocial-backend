const express = require('express');
const router = express.Router();
const cusuario = require('../controlers/usuario')
const auth = require('../auth');

router.get('/lista', auth.verificatoken, cusuario.listado);

router.put('/insertar', auth.verificatoken, cusuario.insertar);

router.delete('/borrar', auth.verificatoken, cusuario.borrar);

router.post('/actualizar', auth.verificatoken, cusuario.actualizar);

router.post('/login', cusuario.verificar);

module.exports = router 

