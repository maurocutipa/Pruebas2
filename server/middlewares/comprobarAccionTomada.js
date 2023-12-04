const showError = require('@utils/showError');
const queryHandler = require('@utils/queryHandler');

const comprobarAccionTomada = async (req, res, next) => {
  try {
    const { idDenuncia } = req.body;

    let query = `
          SELECT
            d.accion
          FROM denuncia d
          WHERE id_denuncia = ?`;

    const [denuncia] = await queryHandler(query, [idDenuncia]);

    if (!denuncia) {
      return res.status(404).json({
        message: `Denuncia con el id: ${id} no existe`,
        data: { denuncia },
      });
    }

    if (!!denuncia.accion) {
      return res.status(400).json({
        message: `La denuncia ya tiene una accion tomada`,
        data: { denuncia },
      });
    }

    next();
  } catch (error) {
    showError(error);
    res.status(500).json({
      ok: false,
      message: '500 SERVER ERROR',
    });
  }
};

module.exports = { comprobarAccionTomada };
