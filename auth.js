const jwt = require("jsonwebtoken");

module.exports = {
  verificatoken: (req, res, next) => {
    let token = req.get("authorization");
    console.log(token);
    if (token) {
      const formattedToken = token.startsWith("Bearer ")
        ? token.slice(7, token.length)
        : token;

      jwt.verify(formattedToken, process.env.SECRET, (err, decoded) => {
        if (err) {
          console.log("Error al verificar el token:", err);
          return res.status(403).send("Token Inválido");
        }
        req.decoded = decoded;
        console.log("Usuario autorizado", decoded);
        next();
      });
    } else return res.status(403).send("NO existe Token");
  },
};
