const httpErrorHandler = require('../utils/httpErrorHandler');
const queryHandler = require('../utils/queryHandler');

const getDenunciadosParaLegajo = async (req, res) => {
  const { id } = req.params;

  try {
    query = `
      SELECT 
        i.id,
        CONCAT(i.nombre, ' ', i.apellido) AS nombreCompleto,
        it.tipo_interviniente AS tipoInterviniente
      FROM interviniente_denuncia id
      LEFT JOIN interviniente i ON id.id_interviniente = i.id
      LEFT JOIN interviniente_tipo it ON i.id_interviniente_tipo = it.id_interviniente_tipo
      WHERE id_denuncia = ?`;
    const intervinientes = await queryHandler(query, [id]);

    if (!intervinientes[0]) {
      return res.status(404).json({
        message: `Intervinientes de denuncia id:${id} no existen`,
        data: { intervinientes },
      });
    }

    const denunciados = intervinientes.filter(
      (interviniente) => interviniente.tipoInterviniente === 'Denunciado'
    );

    res.status(200).json({
      message: 'ok',
      data: { denunciados },
    });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

module.exports = { getDenunciadosParaLegajo };
