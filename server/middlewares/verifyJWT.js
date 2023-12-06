const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.cookies;
  console.log(authHeader);

  // if (process.NODE_ENV !== 'production') {
  //   next();
  //   return;
  // }

  if (!authHeader?.jwt) return res.sendStatus(401);
  const token = authHeader.jwt;
  console.log('asdasfajwiqucwqiubcn');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //token inválido
    req.username = decoded.username;
    req.roles = decoded.roles;
    req.idUsuario = decoded.idUsuario;
    next();
  });
};

module.exports = verifyJWT;
