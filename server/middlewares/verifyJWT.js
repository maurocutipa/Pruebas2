const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {

  const authHeader = req.cookies;

    if(process.NODE_ENV !== 'production') {
        next()
        return
    }
    const authHeader = req.cookies
    if (!authHeader?.jwt) return res.sendStatus(401);
    const token = authHeader.jwt;
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //token inválido
            req.usuario = decoded.usuario;
            //req.roles = decoded.roles,
            req.idUsuario = decoded.idUsuario
            next();
        }
    );
}

module.exports = verifyJWT;
