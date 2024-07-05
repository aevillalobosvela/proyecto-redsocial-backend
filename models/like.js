const coneccion = require("../database");

module.exports = {
  listado: (callBack) => {
    coneccion.query(
      `SELECT * FROM like_user;`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  listado_user: (datos, callBack) => {
    coneccion.query(
      `SELECT * FROM like_user where id = ?;`,
      [datos.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  insertar: (datos, callBack) => {
    coneccion.query(
      `insert into like_user (id,cod_pub) values (?,?)`,
      [datos.id, datos.cod_pub],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        coneccion.query(
          `update publicacion set likes = likes + 1 where cod_pub = ?`,
          [datos.cod_pub],
          (detalleError, dresults) => {
            if (detalleError) {
              callBack(error);
            }
            return callBack(null, dresults);
          }
        );
      }
    );
  },

  quitar: (datos, callBack) => {
    coneccion.query(
      `delete from like_user where id=? and cod_pub=?`,
      [datos.id, datos.cod_pub],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        coneccion.query(
          `update publicacion set likes = likes - 1 where cod_pub = ?`,
          [datos.cod_pub],
          (detalleError, dresults) => {
            if (detalleError) {
              callBack(error);
            }
            return callBack(null, dresults);
          }
        );
      }
    );
  },

  mislikes: (datos, callBack) => {
    coneccion.query(
      `SELECT SUM(likes) AS total_likes FROM publicacion WHERE id = ?;`,
      [datos.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0].total_likes);
      }
    );
  },
};
