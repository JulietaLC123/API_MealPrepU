const jwt = require("jsonwebtoken");

//función para verificar que el token sea válido
//y si el usuario tiene permiso para acceder
//En el servidor se va a recibir así:
//access-token

const verifyToken = (req, res, next) => {
  const token = req.header("access-token");

  if (!token) {
    return res.status(401).json({
      error: "No tienes permiso para acceder a esta ruta"
    });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET);

    req.user = verified; // aquí guardamos el id del usuario
    next();
  } catch (error) {
    res.status(400).json({
      error: "Token inválido"
    });
  }
};

module.exports = verifyToken;