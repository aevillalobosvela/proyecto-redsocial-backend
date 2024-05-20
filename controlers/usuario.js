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
    body.password = sha256(body.password)
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
    body.password = sha256(body.password)
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
};
