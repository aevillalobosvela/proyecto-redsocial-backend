const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
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

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5050;

// Iniciar el servidor en el puerto definido
app.listen(port, () => {
  console.log("Conectado en el puerto: ", port);
});