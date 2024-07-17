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

  topuser_pub: (req, res) => {
    mpublicacion.topuser_pub((err, results) => {
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
    mpublicacion.mis_pub({ id }, (err, results) => {
      if (err) {
        return;
      }
      return res.json({
        datos: results,
      });
    });
  },

  insertar: (req, res) => {
    const { body, file } = req;
    let url = null;
    console.log(body);
    if (file) {
      url = `http://localhost:5050/uploads/${file.filename}`;
      console.log(file);
      console.log(url);
    }
    mpublicacion.insertar(url, body, (err, results) => {
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

  eliminar: (req, res) => {
    const { cod_pub } = req.query;
    mpublicacion.eliminar({ cod_pub }, (err, results) => {
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
};
