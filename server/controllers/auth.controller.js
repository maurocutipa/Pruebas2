const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const queryHandler = require('../utils/queryHandler');
const { generateJWT } = require('../utils/jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;
  let query = `SELECT us.id_usuario, us.nombre, us.apellido, us.username, us.password, ps.salt, us.id_sector FROM usuarios us INNER JOIN usuarios_password_salt ps ON us.id_usuario = ps.id_usuario  WHERE us.email_institucional = ? LIMIT 1`;

  try {
    let [usuario] = await queryHandler(query, [email]);

    if (!usuario) {
      return res
        .status(400)
        .json({ message: 'Email o contraseña incorrectos' });
    }
    const time = new Date().getTime() - 2 * 1000 * 60 * 60;

    query = `SELECT time FROM usuarios_login WHERE id_usuario = ? AND time > ?`;
    const intentos = await queryHandler(query, [usuario.id_usuario, time]);

    if (intentos.length > 10) {
      return res.status(423).json({ message: 'Intentos máximos alcanzados' });
    }

    // Contraseña incorrecta
    if (
      usuario.password !==
      crypto
        .createHash('sha512')
        .update(password + usuario.salt)
        .digest('hex')
    ) {
      const tiempo = new Date().getTime();
      await queryHandler(
        'INSERT INTO usuarios_login (id_usuario, time) VALUES (?,?)',
        [usuario.id_usuario, tiempo]
      );
      return res
        .status(400)
        .json({ message: 'Email o contraseña incorrectos' });
    }

    // Eliminar los intentos fallidos
    await queryHandler('DELETE FROM usuarios_login WHERE id_usuario = ?', [
      usuario.id_usuario,
    ]);

    // Busqueda de roles del usuario
    query =
      "SELECT rol.nombre FROM rol_asignado ra INNER JOIN rol ON ra.id_rol = rol.id_rol WHERE (ra.id_usuario_sector = ? AND ra.tipo = 'Usuario') OR (ra.id_usuario_sector = ? AND ra.tipo = 'Sector')";
    let roles = await queryHandler(query, [
      usuario.id_usuario,
      usuario.id_sector,
    ]);
    //roles = roles.map((rol) => rol.nombre);

    //console.log(roles);
    const accessToken = await generateJWT({
      usuario: usuario,
      idUsuario: usuario.id_usuario,
      roles,
    });

    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 12 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Acceso exitoso',
      data: {
        usuario: usuario.username,
        idUsuario: usuario.id_usuario,
        roles,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const logout = async (req, res) => {
  try {
    // const cookies = req.cookies;
    // if (!cookies?.jwt) return res.sendStatus(204);
    // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: -1,
    });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const refresh = async (req, res) => {
  try {
    const refreshToken = await generateJWT({
      idUsuario: req.idUsuario,
      usuario: req.usuario,
      /* req.roles */
    });

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 12 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Nuevo token',
      data: {
        usuario: req.usuario.username,
        /* roles: req.roles, */
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { login, logout, refresh };
