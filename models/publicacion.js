const coneccion = require("../database");

module.exports = {
  listado: (callBack) => {
    coneccion.query(
      `SELECT * FROM publicacion ORDER BY fec_pub DESC;`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  user_pub: (callBack) => {
    coneccion.query(
      `SELECT * FROM usuario u,publicacion p WHERE u.id = p.id ORDER BY fec_pub DESC;`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  mis_pub: (datos, callBack) => {
    coneccion.query(
      `SELECT * FROM usuario u,publicacion p WHERE u.id = p.id AND p.id = ? ORDER BY fec_pub DESC;`,
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
      `insert into publicacion (contenido,likes,fec_pub,id) values (?,?,?,?)`,
      [datos.contenido, datos.likes, datos.fec_pub, datos.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
