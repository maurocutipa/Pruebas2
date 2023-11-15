const jwt = require('jsonwebtoken');

const generateJWT = (payload) => {
  return new Promise((resolve, reject) => {

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '12h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        }

        resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };