const { matchedData } = require('express-validator');

const httpErrorHandler = require('../utils/httpErrorHandler');
const queryHandler = require('../utils/queryHandler');
const safeConcatQuery = require('../utils/safeConcatQuery');
const convertToSnakeCase = require('../utils/convertToSnakeCase');
const showError = require('../utils/showError');

const getDenuncias = async (req, res) => {
  const { limit, offset } = req.body;

  let filters = ``;

  if (req.body.idDenuncia !== undefined && req.body.idDenuncia !== null) {
    filters += ` AND d.id_denuncia = ${req.body.idDenuncia}`;
  }

  if (req.body.tipoDenuncia !== undefined && req.body.tipoDenuncia !== 0) {
    filters += `AND d.id_tipo_denuncia = ${req.body.tipoDenuncia}`;
  }

  if (req.body.seccional !== undefined && req.body.seccional !== 0) {
    filters += ` AND d.id_seccional = ${req.body.seccional}`;
  }

  try {
    let query = `SELECT COUNT(*) AS total_records FROM denuncia d WHERE estado = 1 ${filters};`;
    const count = await queryHandler(query);

    query = `
      SELECT
          id_denuncia AS idDenuncia,
          fecha_denuncia AS fechaDenuncia,
          realizacion,
          competencia,
          td.nombre AS tipoDenuncia,
          s.nombre AS seccional
      FROM denuncia d
      JOIN denuncia_tipos td ON d.id_tipo_denuncia = td.id_tipo_denuncia
      LEFT JOIN seccionales s ON d.id_seccional = s.id_seccional
      WHERE d.estado = 1 ${filters}
      LIMIT ${limit}
      OFFSET ${offset}
    `;
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
            id_sector AS idDelegacionFiscal,
            label AS delegacionFiscal
        FROM sectores
        WHERE fiscalia_h = 'SI'
    `;

    const delegacionesFiscales = await queryHandler(query);

    res.status(200).json({
      message: 'ok',
      data: { tiposDenuncia, seccionales, delegacionesFiscales },
    });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

const deleteDenuncia = async (req, res) => {
  // TODO: Validar idDenuncia
  try {
    const query = `UPDATE denuncia SET estado = 0 WHERE id_denuncia = ${req.params.id}`;
    const result = await queryHandler(query);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Denuncia con ese id no existe' });
    }

    res
      .status(200)
      .json({
        message: 'Denuncia eliminada con éxito',
        data: { id: req.params.id },
      });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

module.exports = { getDenuncias, getDatosDeFiltros, deleteDenuncia };
