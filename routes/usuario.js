const express = require('express');
const router = express.Router();
const cusuario = require('../controlers/usuario')

router.get('/lista', cusuario.listado);

router.put('/insertar', cusuario.insertar);

router.delete('/delete',(req,res)=>{
    res.status(200).send('Usuario eliminado');
});

router.post('/actualizar',(req,res)=>{
    res.status(205).send('Usuario actualizado');
});

module.exports = router 

