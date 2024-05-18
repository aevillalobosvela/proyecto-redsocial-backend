const musuario = require("../models/usuario");

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
        });
      }
    });
  },
};
