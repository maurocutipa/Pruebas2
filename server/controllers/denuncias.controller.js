const { matchedData } = require('express-validator');

const httpErrorHandler = require('../utils/httpErrorHandler');
const queryHandler = require('../utils/queryHandler');
const safeConcatQuery = require('../utils/safeConcatQuery');
const convertToSnakeCase = require('../utils/convertToSnakeCase');
const showError = require('../utils/showError');

const getDenuncias = async (req, res) => {
  const { limit, offset } = req.body;

  try {
    let query = `SELECT COUNT(*) AS total_records FROM denuncia;`;
    const count = await queryHandler(query);

    query = `
        SELECT
            id_denuncia AS idDenuncia,
            fecha_denuncia AS fechaDenuncia,
            td.nombre AS tipoDenuncia
        FROM denuncia d
        JOIN denuncia_tipos td ON d.id_tipo_denuncia = td.id_tipo_denuncia
        LIMIT ${limit}
        OFFSET ${offset}`;
    const denuncias = await queryHandler(query);

    res.status(200).json({
      message: 'ok',
      data: { denuncias, totalRecords: count[0]['total_records'] },
    });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

const getDatosDeFiltros = async (req, res) => {
  try {
    let query = `
        SELECT
            id_tipo_denuncia AS idTipoDenuncia,
            nombre AS tipoDenuncia
        FROM denuncia_tipos
    `;
    const tiposDenuncia = await queryHandler(query);

    query = `
        SELECT
            id_seccional AS idSeccional,
            nombre AS seccional 
        FROM seccionales
    `;

    const seccionales = await queryHandler(query);

    query = `
        SELECT
            id_delegacion_fiscal AS idDelegacionFiscal,
            nombre AS delegacionFiscal
        FROM delegaciones_fiscales
    `;

    const delegacionesFiscales = await queryHandler(query);

    res
      .status(200)
      .json({
        message: 'ok',
        data: { tiposDenuncia, seccionales, delegacionesFiscales },
      });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

module.exports = { getDenuncias, getDatosDeFiltros };
