const mcomentario = require("../models/comentario");

module.exports = {
  listado: (req, res) => {
    mcomentario.listado((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        datos: results,
      });
    });
  },

  listado_com: (req, res) => {
    const { cod_pub } = req.query;
    mcomentario.listado_com({ cod_pub }, (err, results) => {
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
    const body = req.body;
    mcomentario.insertar(body, (err, results) => {
      if (err) {
        if (!res.headersSent) {
          return res.json({
            success: 0,
            error: "Error en el comentario",
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
