const musuario = require("../models/usuario");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function sha256(string) {
  return crypto.createHash("sha256").update(string).digest("hex");
}

module.exports = {
  listado: (req, res) => {
    musuario.listado((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(results);
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  insertar: (req, res) => {
    const body = req.body;
    body.password = sha256(body.password);
    musuario.insertar(body, (err, results) => {
      if (err) {
        console.log(err);
        if (!res.headersSent) {
          return res.json({
            success: 0,
            error: err,
          });
        }
      }
      console.log(results);
      if (!res.headersSent) {
        return res.json({
          success: 1,
          data: results,
          nombre: body,
        });
      }
    });
  },

  borrar: (req, res) => {
    const body = req.body;
    musuario.borrar(body, (err, results) => {
      if (err) {
        console.log(err);
        if (!res.headersSent) {
          return res.json({
            success: 0,
            error: err,
          });
        }
      }
      console.log(results);
      if (!res.headersSent) {
        return res.json({
          success: 1,
          data: results,
          nombre: body,
        });
      }
    });
  },

  actualizar: (req, res) => {
    const body = req.body;
    body.password = sha256(body.password);
    musuario.actualizar(body, (err, results) => {
      if (err) {
        console.log(err);
        if (!res.headersSent) {
          return res.json({
            success: 0,
            error: err,
          });
        }
      }
      console.log(results);
      if (!res.headersSent) {
        return res.json({
          success: 1,
          data: results,
          nombre: body,
        });
      }
    });
  },

  verificar: (req, res) => {
    const body = req.body;
    body.password = sha256(body.password);
    musuario.verificar(body, (err, results) => {
      if (err) {
        console.log("error1");
        return res.status(500).json({
          error: err,
          realizado: 0,
          mensaje: "Datos no validos",
        });
      } else {
        jwt.sign(JSON.stringify(results), process.env.SECRET, (err, token) => {
          if (err) {
            console.log("error2");
            return res.status(500).json({
              error: err,
              realizado: 0,
              mensaje: "Credenciales incorrectas",
            });
          } else {
            console.log("realizado");
            return res.status(200).json({
              realizado: 1,
              data: results,
              token: token,
            });
          }
        });
      }
    });
  },
};
