const express = require("express");
const dotenv = require("dotenv").config()

const app = express();

app.get('/',(req,res)=>{
    res.status(200).send('Bienvenido a la API get');
});

app.use('/usuarios',require("./routes/routes.js"));

app.listen(process.env.PORT, ()=>{
    console.log("conectado en el puerto: ",process.env.PORT)
});