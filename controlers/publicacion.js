const mpublicacion = require("../models/publicacion");

module.exports = {
  listado: (req, res) => {
    mpublicacion.listado((err, results) => {
      if (err) {
        return;
      }
      return res.json({
        datos: results,
      });
    });
  },

  user_pub: (req, res) => {
    mpublicacion.user_pub((err, results) => {
      if (err) {
        return;
      }
      return res.json({
        datos: results,
      });
    });
  },

  mis_pub: (req, res) => {
    const { id } = req.query;
    mpublicacion.mis_pub({ id },(err, results) => {
      if (err) {
        return;
      }
      return res.json({
        datos: results,
      });
    });
  },

  insertar: (req, res) => {
    const body = req.body;
    mpublicacion.insertar(body, (err, results) => {
      if (err) {
        if (!res.headersSent) {
          return res.json({
            success: 0,
            error: "Error en la publicacion",
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
};
