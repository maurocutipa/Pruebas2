
const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const safeConcatQuery = require('@utils/safeConcatQuery');
const convertToSnakeCase = require('@utils/convertToSnakeCase');
const { matchedData } = require('express-validator');
const showError = require('@utils/showError');
const { formatDateHour } = require('@utils/formatDate');

DeleteController = {}

DeleteController.deleteDenuncia = async (req, res) => {
    // TODO: Validar idDenuncia
    /* eliminamos las tablas de las denuncias especificas,
    por si llegasen a afectar estadisticas o filtros????
    */
    try {
        const query = `UPDATE denuncia SET estado = 0 WHERE id_denuncia = ${req.params.id}`;
        const result = await queryHandler(query);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Denuncia con ese id no existe' });
        }

        res.status(200).json({
            message: 'Denuncia eliminada con éxito',
            data: { id: req.params.id },
        });
    } catch (error) {
        console.log(error);
        httpErrorHandler(res);
    }
};

module.exports = DeleteController