const mcomentario = require("../models/comentario");

module.exports = {
  listado: (req, res) => {
    mcomentario.listado((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(results);
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
      console.log(results);
      if (!res.headersSent) {
        return res.json({
          success: 1,
          data: results,
        });
      }
    });
  },
};
