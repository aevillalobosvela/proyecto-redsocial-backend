const coneccion = require("../database");
const crypto = require("crypto");

function sha256(string) {
  return crypto.createHash("sha256").update(string).digest("hex");
}

module.exports = {
  listado: (callBack) => {
    coneccion.query(`select * from usuario`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },

  insertar: (datos, callBack) => {
    coneccion.query(
      `insert into usuario (nombre,password) values (?,?)`,
      [datos.nombre, datos.password],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  borrar: (datos, callBack) => {
    coneccion.query(
      `delete from usuario where id=?`,
      [datos.id],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  actualizar: (datos, callBack) => {
    coneccion.query(
      `update usuario set nombre = ?,password = ? where id=?`,
      [datos.nombre, datos.password, datos.id],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  verificar: (datos, callBack) => {
   

    coneccion.query(
      `SELECT id, nombre FROM usuario WHERE nombre = ? AND password = ?`,
      [datos.nombre, datos.password],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        if (!datos.nombre || !datos.password) {
          return callBack(error);
        }
        if (results.length === 0) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
