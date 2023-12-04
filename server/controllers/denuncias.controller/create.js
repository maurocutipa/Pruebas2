const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const safeConcatQuery = require('@utils/safeConcatQuery');
const convertToSnakeCase = require('@utils/convertToSnakeCase');
const { matchedData } = require('express-validator');
const showError = require('@utils/showError');
const { interntalAPI } = require('../../config/http');

CreateController = {};

//CREAR DENUNCIAS

CreateController.createDenuncia = async (req, res) => {
  try {
    const denuncia = req.body.denuncia;
    let query;

    if (
      denuncia.idTipoDenuncia === 'Busqueda de Personas' ||
      denuncia.idTipoDenuncia === 'Actuación de Oficio'
    ) {
      query = `
        SELECT 
            CONCAT(u.nombre, ' ', u.apellido) AS nombreCompleto
        FROM usuarios u
        WHERE id_usuario = ?
    `;

      const [usuario] = await queryHandler(query, [req.idUsuario]);

      query = `
        SELECT
            CONCAT (s.nombre, '-', df.nombre) AS delegacionFiscal,
            j.nombre AS nombreJurisdiccion
        FROM seccionales s
        LEFT JOIN delegaciones_fiscales df ON df.id_delegacion_fiscal = s.id_delegacion
        LEFT JOIN jurisdicciones j ON j.id_jurisdiccion = s.id_jurisdiccion
        WHERE id_seccional = ?
    `;
      const [seccional] = await queryHandler(query, [denuncia.seccional]);

      req.body.receptor = {
        nombreCompleto: usuario.nombreCompleto,
        delegacionFiscal: seccional.delegacionFiscal,
        jurisdiccion: seccional.nombreJurisdiccion,
      };
    }

    const newBody = new FormData();
    req.files?.forEach((file) => {
      const fileToSend = new File([file.buffer], file.originalname, {
        type: file.mimetype,
      });
      newBody.append(file.fieldname, fileToSend);
    });
    newBody.append('data', JSON.stringify(req.body));

    const { data } = await interntalAPI.post('/denuncias/create', newBody, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    query = `
        UPDATE denuncia
        SET id_seccional = ?,
            realizacion = 'PRE',
            id_usuario = ?,
            funcion_grado = ?,
            flagrancia = ?,
            firma_denunciante = ?,
            firma_autoridad = ?
        WHERE id_denuncia = ?
    `;
    const values = [
      denuncia.seccional,
      req.idUsuario,
      denuncia.funcionGrado,
      denuncia.flagrancia,
      0,
      0,
      data.idDenuncia,
    ];
    const resp = await queryHandler(query, values);
    console.log(resp);

    res.status(200).json({
      ok: true,
      message: 'Denuncia creada',
      data: { data: req.body },
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

//crear detalles en ver denuncia

CreateController.createDenunciaAbigeatoDetalles = async (req, res) => {
  try {
    const data = matchedData(req);

    const resQueries = await Promise.all((detalle) => {
      const keys = Object.keys(detalle).map((key) => convertToSnakeCase(key));
      const values = Object.values(detalle);

      const query = `INSERT INTO denuncia_abigeato_detalles(${keys.join(
        ', '
      )}) VALUES (${keys.map((key) => '?').join(', ')})`;

      return queryHandler(query, values);
    });

    res.status(200).json({
      ok: true,
      message: 'Detalles de abigeato creado',
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

CreateController.createDenunciaIncidenteVialVehiculo = async (req, res) => {
  try {
    const data = matchedData(req);

    const resQueries = await Promise.all(
      data.map((vehiculo) => {
        const keys = Object.keys(vehiculo).map((key) =>
          convertToSnakeCase(key)
        );
        const values = Object.values(vehiculo);

        const query = `INSERT INTO denuncia_incidentes_viales_vehiculos(${keys.join(
          ', '
        )}) VALUES (${keys.map((key) => '?').join(', ')})`;

        return queryHandler(query, values);
      })
    );

    res.status(200).json({
      ok: true,
      message: 'vehiculos de incidente vial creado',
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

CreateController.uploadFile = async (req, res) => {
  try {
    const idDenuncia = req.params.id;

    req.files &&
      (await Promise.all(
        req.files.map((file) => {
          const query = `INSERT INTO denuncia_adjuntos(id_denuncia, nombre_original, nombre_archivo, fecha, estado) VALUES(?,?,?,NOW(),1)`;

          return queryHandler(query, [
            idDenuncia,
            file.originalname,
            file.filename,
          ]);
        })
      ));

    res.status(200).json({
      ok: true,
      message: 'Files uploaded',
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

module.exports = CreateController;
