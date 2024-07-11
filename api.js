const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const db = require("./database");
const multer = require("multer");
const path = require('path')

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la API get");
});

app.use(require("./routes/usuario.js"));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(process.env.PORT, () => {
  console.log("conectado en el puerto: ", process.env.PORT);
});
