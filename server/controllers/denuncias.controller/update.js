const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const { formatDateHour } = require('@utils/formatDate');

const UpdateController = {};

UpdateController.ratificarDenuncia = async (req, res) => {
  const { id } = req.params;

  const [fecha, hora] = formatDateHour(new Date()).split(' ');

  try {
    let query = `SELECT id_user_ratificacion as idUserRatificacion FROM denuncia WHERE id_denuncia = ?`;
    let [data] = await queryHandler(query, [id]);
    if (data.idUserRatificacion) {
      return res
        .status(400)
        .json({ message: `Denuncia con el id: ${id} ya fue ratificada` });
    }

    query = `
      UPDATE
        denuncia
      SET 
        fecha_ratificacion = ?,
        hora_ratificacion = ?,
        ratificacion = 'SI'
      WHERE id_denuncia = ?`;

    response = await queryHandler(query, [fecha, hora, id]);

    if (response.changedRows === 0) {
      return res
        .status(400)
        .json({ message: `Denuncia con el id: ${id} no fue ratificada` });
    }

    res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

module.exports = UpdateController;
