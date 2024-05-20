const express = require("express");
const dotenv = require("dotenv").config();
const db = require("./database");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la API get");
});

app.use("/usuario", require("./routes/usuario.js"));

app.listen(process.env.PORT, () => {
  console.log("conectado en el puerto: ", process.env.PORT);
});
