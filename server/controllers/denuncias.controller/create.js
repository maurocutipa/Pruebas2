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
    // console.log(req.files);
    //console.log(req.body);
    const denuncia = req.body.denuncia;

    // a function to convert buffer to file
    // const files = req.files.map((f) => {
    //     const file = new File([f.buffer], f.fieldname, {
    //         type: f.mimetype,
    //     });
    //     return file
    // });

    // a function to convert buffer to blob
    const blobs = req.files.map((f) => {
      const blob = new Blob([f.buffer], { type: f.mimetype });
      return blob;
    });
    const files = req.files.map((f) => {
      const file = new File([f.buffer], f.originalname, {
        type: f.mimetype,
      });
      return file;
    });

    const newBody = new FormData();
    files.forEach((file) => {
      newBody.append('file', file);
    });
    newBody.append('data', JSON.stringify(req.body));

    const { data } = await interntalAPI.post('/denuncias/create', newBody, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    let query = `
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
    await queryHandler(query, values);

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

CreateController.createDenunciaGeneral = async (req, res) => {
  try {
    const data = matchedData(req);
    const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
    const values = Object.values(data);

    const query = `INSERT INTO denuncia(${keys.join(
      ', '
    )},estado,fecha_denuncia,hora_denuncia,fecha_ratificacion,hora_ratificacion) VALUES (${keys
      .map((key) => '?')
      .join(', ')},1,CURDATE(),CURTIME(),CURDATE(),CURTIME())`;
    const resQuery = await queryHandler(query, values);

    res.status(200).json({
      ok: true,
      message: 'Denuncia creada',
      id: resQuery.insertId,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

CreateController.createDenunciaGenero = async (req, res) => {
  try {
    const data = matchedData(req);
    const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
    const values = Object.values(data);

    let valoracion = 0;
    Object.keys(data)
      .filter((key) => key !== 'idDenuncia')
      .forEach((clave) => {
        valoracion += parseInt(data[clave]);
      });

    const query = `INSERT INTO denuncia_violencia_genero(${keys.join(
      ', '
    )},valoracion) VALUES (${keys.map((key) => '?').join(', ')},${valoracion})`;

    const resQuery = await queryHandler(query, values);

    res.status(200).json({
      ok: true,
      message: 'Denuncia de Genero creada',
      id: resQuery.insertId,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

CreateController.createDenunciaFamiliar = async (req, res) => {
  try {
    const data = matchedData(req);
    const keys = Object.keys(data).map((key) => convertToSnakeCase(key));

    const values = Object.values(data);

    const query = `INSERT INTO denuncia_violencia_familiar(${keys.join(
      ', '
    )}) VALUES (${keys.map((key) => '?').join(', ')})`;

    const resQuery = await queryHandler(query, values);

    res.status(200).json({
      ok: true,
      message: 'Denuncia de Violencia de Genero creada',
      id: resQuery.insertId,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

CreateController.createDenunciaAbigeato = async (req, res) => {
  try {
    const data = matchedData(req);
    const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
    const values = Object.values(data);

    const query = `INSERT INTO denuncia_abigeato(${keys.join(
      ', '
    )}) VALUES (${keys.map((key) => '?').join(', ')})`;

    const resQuery = await queryHandler(query, values);

    res.status(200).json({
      ok: true,
      message: 'Denuncia Abigeato creada',
      id: resQuery.insertId,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

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

CreateController.createDenunciaPropiedad = async (req, res) => {
  try {
    const data = matchedData(req);
    const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
    const values = Object.values(data);

    const query = `INSERT INTO denuncia_propiedad(${keys.join(
      ', '
    )}) VALUES (${keys.map((key) => '?').join(', ')})`;

    const resQuery = await queryHandler(query, values);

    res.status(200).json({
      ok: true,
      message: 'Denuncia contra la Propiedad creada',
      id: resQuery.insertId,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

CreateController.createDenunciaDelitosPersonas = async (req, res) => {
  try {
    const data = matchedData(req);
    const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
    const values = Object.values(data);

    const query = `INSERT INTO denuncia_delitos_personas(${keys.join(
      ', '
    )}) VALUES (${keys.map((key) => '?').join(', ')})`;

    const resQuery = await queryHandler(query, values);

    res.status(200).json({
      ok: true,
      message: 'Denuncia de Delito a Persona creada',
      id: resQuery.insertId,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

CreateController.createDenunciaIncidenteVial = async (req, res) => {
  try {
    const data = matchedData(req);
    const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
    const values = Object.values(data);

    const query = `INSERT INTO denuncia_incidentes_viales(${keys.join(
      ', '
    )}) VALUES (${keys.map((key) => '?').join(', ')})`;

    const resQuery = await queryHandler(query, values);

    res.status(200).json({
      ok: true,
      message: 'Denuncia de incidente vial creada',
      id: resQuery.insertId,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

CreateController.createDenunciaDelitosSexuales = async (req, res) => {
  try {
    const data = matchedData(req);
    const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
    const values = Object.values(data);

    const query = `INSERT INTO denuncia_delitos_sexuales(${keys.join(
      ', '
    )}) VALUES (${keys.map((key) => '?').join(', ')})`;

    const resQuery = await queryHandler(query, values);

    res.status(200).json({
      ok: true,
      message: 'Denuncia de Delito Sexual creada',
      id: resQuery.insertId,
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

CreateController.createDenunciaDanos = async (req, res) => {
  try {
    const data = matchedData(req);
    const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
    const values = Object.values(data);

    const query = `INSERT INTO denuncia_danos(${keys.join(', ')}) VALUES (${keys
      .map((key) => '?')
      .join(', ')})`;

    const resQuery = await queryHandler(query, values);

    res.status(200).json({
      ok: true,
      message: 'Denuncia de Daños creada',
      id: resQuery.insertId,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

CreateController.createDenunciaMaltratoAnimal = async (req, res) => {
  try {
    const data = matchedData(req);
    const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
    const values = Object.values(data);

    const query = `INSERT INTO denuncia_maltrato_animal(${keys.join(
      ', '
    )}) VALUES (${keys.map((key) => '?').join(', ')})`;

    const resQuery = await queryHandler(query, values);

    res.status(200).json({
      ok: true,
      message: 'Denuncia de Maltrato Animal creada',
      id: resQuery.insertId,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

CreateController.createDenunciaBusquedaPersona = async (req, res) => {
  try {
    const data = matchedData(req);
    const keys = Object.keys(data).map((key) => convertToSnakeCase(key));
    const values = Object.values(data);

    const query = `INSERT INTO denuncia_busqueda_persona(${keys.join(
      ', '
    )}) VALUES (${keys.map((key) => '?').join(', ')})`;

    const resQuery = await queryHandler(query, values);

    res.status(200).json({
      ok: true,
      message: 'Denuncia de Busqueda de Persona creada',
      id: resQuery.insertId,
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
