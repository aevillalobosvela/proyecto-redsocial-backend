const express = require('express');
const router = express.Router();

router.get('/lista',(req,res)=>{
    res.status(205).send('Lista de usuarios');
});

router.put('/insertar',(req,res)=>{
    res.status(203).send('Insertar usuario');
});

router.delete('/delete',(req,res)=>{
    res.status(200).send('Usuario eliminado');
});

router.post('/actualizar',(req,res)=>{
    res.status(205).send('Usuario actualizado');
});

module.exports = router 

