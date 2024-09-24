const musuario = require("../models/usuario");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function sha256(string) {
  return crypto.createHash("sha256").update(string).digest("hex");
}

module.exports = {
  listado: (req, res) => {
    console.log("LISTAR");
    musuario.listado((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        datos: results,
      });
    });
  },

  insertar: (req, res) => {
    const { body, file } = req;
    body.password = sha256(body.password);
    let url = null;
    if (file) {
      url = `http://localhost:5050/uploads/${file.filename}`;
    }
    musuario.insertar(url, body, (err, results) => {
      if (err) {
        if (!res.headersSent) {
          return res.json({
            success: 0,
            error: "Usuario ya registrado",
          });
        }
      }
      if (!res.headersSent) {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },

  borrar: (req, res) => {
    const { id } = req.query;
    musuario.borrar({ id }, (err, results) => {
      if (err) {
        if (!res.headersSent) {
          return res.json({
            success: 0,
            error: err,
          });
        }
      }
      if (!res.headersSent) {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },

  actualizar: (req, res) => {
    const { body, file } = req;
    let url = null;
    if (file) {
      url = `http://localhost:5050/uploads/${file.filename}`;
    }
    musuario.actualizar(url, body, (err, results) => {
      if (err) {
        if (!res.headersSent) {
          return res.json({
            success: 0,
            error: err,
          });
        }
      }
      if (!res.headersSent) {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },

  actualizarpass: (req, res) => {
    const body = req.body;
    body.password = sha256(body.password);
    musuario.actualizarpass(body, (err, results) => {
      if (err) {
        if (!res.headersSent) {
          return res.json({
            success: 0,
            error: err,
          });
        }
      }
      if (!res.headersSent) {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },

  verificar: (req, res) => {
    const body = req.body;
    body.password = sha256(body.password);
    musuario.verificar(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          error: err,
          realizado: 0,
          mensaje: "Datos no validos",
        });
      } else {
        jwt.sign(JSON.stringify(results), process.env.SECRET, (err, token) => {
          if (err) {
            return res.status(500).json({
              error: err,
              realizado: 0,
              mensaje: "Credenciales incorrectas",
            });
          } else {
            return res.status(200).json({
              datos: results[0],
              token: token,
            });
          }
        });
      }
    });
  },
};
