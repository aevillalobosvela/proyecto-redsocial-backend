const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const db = require("./database");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Alternatively, you can specify allowed origins
// app.use(cors({
//   origin: 'http://localhost:8080' // Allow only this origin
// }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la API get");
});

app.use("/usuario", require("./routes/usuario.js"));

app.listen(process.env.PORT, () => {
  console.log("conectado en el puerto: ", process.env.PORT);
});
