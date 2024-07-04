const mlike = require("../models/like");

module.exports = {
    listado: (req, res) => {
      mlike.listado((err, results) => {
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
    
    listado_user: (req, res) => {
        const { id } = req.query;
        mlike.listado_user({ id }, (err, results) => {
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
      mlike.insertar(body, (err, results) => {
        if (err) {
          if (!res.headersSent) {
            return res.json({
              success: 0,
              error: "Error",
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
  