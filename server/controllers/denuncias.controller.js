const httpErrorHandler = require('../utils/httpErrorHandler');
const queryHandler = require('../utils/queryHandler');
const safeConcatQuery = require('../utils/safeConcatQuery');
const convertToSnakeCase = require('../utils/convertToSnakeCase');
const { matchedData } = require('express-validator');
const showError = require('@utils/showError')


const DenunciasController = {}


//CONSULTAR DENUNCIAS

DenunciasController.getDenuncias = async (req, res) => {
  const { limit, offset } = req.body;

  let filters = ``;

  if (req.body.idDenuncia !== undefined && req.body.idDenuncia !== '') {
    filters += ` AND d.id_denuncia = ${req.body.idDenuncia}`;
  }

  if (req.body.tipoDenuncia !== undefined && req.body.tipoDenuncia !== 0) {
    filters += ` AND d.id_tipo_denuncia = ${req.body.tipoDenuncia}`;
  }

  if (req.body.seccional !== undefined && req.body.seccional !== 0) {
    filters += ` AND d.id_seccional = ${req.body.seccional}`;
  }

  if (req.body.idLegajo !== undefined && req.body.idLegajo !== '') {
    filters += ` AND d.id_legajo = ${req.body.idLegajo}`;
  }

  if (req.body.competencia !== undefined && req.body.competencia !== 0) {
    filters += ` AND d.competencia = ${req.body.competencia}`;
  }

  if (req.body.realizacion !== undefined && req.body.realizacion !== 0) {
    filters += ` AND d.realizacion = ${req.body.realizacion}`;
  }

  if (
    req.body.fiscaliaAsignada !== undefined &&
    req.body.fiscaliaAsignada !== ''
  ) {
    filters += ` AND sc.id_sector = ${req.body.fiscaliaAsignada}`;
  }

  if (
    req.body.fechaDenunciaDesde !== '' &&
    req.body.fechaDenunciaHasta !== ''
  ) {
    filters += ` AND d.fecha_denuncia BETWEEN '${formatDate(
      req.body.fechaDenunciaDesde
    )}' AND '${formatDate(req.body.fechaDenunciaHasta)}'`;
  }

  try {
    let query = `
      SELECT 
        COUNT(*) AS total_records
      FROM denuncia d
      LEFT JOIN legajo l ON d.id_legajo = l.id_legajo
      LEFT JOIN sectores sc ON l.id_sector = sc.id_sector
      WHERE d.estado = 1 ${filters};`;
    const count = await queryHandler(query);

    query = `
      SELECT
          d.id_denuncia AS idDenuncia,
          d.fecha_denuncia AS fechaDenuncia,
          d.hora_denuncia AS horaDenuncia,
          d.realizacion,
          d.id_user_ratificacion AS idUserRatificacion,
          d.competencia,
          td.nombre AS tipoDenuncia,
          s.nombre AS seccional,
          l.id_legajo AS idLegajo,
          sc.label AS fiscaliaAsignada
      FROM denuncia d
      JOIN denuncia_tipos td ON d.id_tipo_denuncia = td.id_tipo_denuncia
      LEFT JOIN seccionales s ON d.id_seccional = s.id_seccional
      LEFT JOIN legajo l ON d.id_legajo = l.id_legajo
      LEFT JOIN sectores sc ON l.id_sector = sc.id_sector
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

DenunciasController.getDenunciaById = async (req, res) => {
  const { id } = req.params;

  try {
    let query = `
      SELECT
        d.id_denuncia AS idDenuncia,
        d.descripcion_como AS descripcionComo,
        d.descripcion_que AS descripcionQue,
        d.fecha_denuncia AS fechaDenuncia,
        d.hora_denuncia AS horaDenuncia,
        d.calle_hecho AS calleHecho,
        d.num_calle AS numCalle,
        d.piso_hecho AS pisoHecho,
        d.departamento_hecho AS departamentoHecho,
        d.informacion_adicional AS informacionAdicional,
        d.detalle_adjunto AS detalleAdjunto,
        d.id_tipo_denuncia AS tipoDenuncia,
        d.latitud_hecho AS latitudHecho, 
        d.longitud_hecho AS longitudHecho, 
        s.nombre AS seccional,
        l.nombre AS nombreLocalidad,
        b.nombre_barrio AS nombreBarrio
      FROM denuncia d
      LEFT JOIN seccionales s ON d.id_seccional = s.id_seccional
      LEFT JOIN localidades l ON d.id_localidad = l.id_localidad
      LEFT JOIN barrios b ON d.id_barrio = b.id_barrio
      WHERE id_denuncia = ?
      LIMIT 1`;
    const denuncia = await queryHandler(query, [id]);

    if (!denuncia[0]) {
      return res.status(404).json({
        message: `Denuncia con el id: ${id} no existe`,
        data: { denuncia },
      });
    }

    query = `
      SELECT 
        i.id,
        i.nombre,
        i.apellido,
        i.tipo_identificacion AS tipoIdentificacion,
        i.numero_identificacion AS numeroIdentificacion,
        -- INTERVINIENTES
        it.tipo_interviniente AS tipoInterviniente,
        it.nombre_tipo AS nombreTipo
      FROM interviniente_denuncia id
      LEFT JOIN interviniente i ON id.id_interviniente = i.id
      LEFT JOIN interviniente_tipo it ON i.id_interviniente_tipo = it.id_interviniente_tipo
      WHERE id_denuncia = ?`;
    const intervinientes = await queryHandler(query, [id]);

    query = ` 
      SELECT 
        s.id_denuncia_adjuntos as idDenunciaAdjuntos,
        s.id_denuncia as idDenuncia,
        s.nombre_original as nombreOriginal,
        s.nombre_archivo as nombreArchivo,
        s.fecha,
        s.estado
      FROM denuncia_adjuntos s
      WHERE id_denuncia = ?`;
    const adjuntos = await queryHandler(query, [id]);
    
    console.log(adjuntos)

    const victimas = intervinientes.filter(
      (interviniente) => interviniente.tipoInterviniente === 'Victima'
    );

    const denunciados = intervinientes.filter(
      (interviniente) => interviniente.tipoInterviniente === 'Denunciado'
    );

    const testigos = intervinientes.filter(
      (interviniente) => interviniente.tipoInterviniente === 'Testigo'
    );

    res.status(200).json({
      message: `Denuncia con el id: ${id}`,
      data: {
        denuncia: denuncia[0],
        intervinientes: { victimas, denunciados, testigos },
        adjuntos: adjuntos
      },
    });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

DenunciasController.getDatosDeFiltros = async (req, res) => {
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

DenunciasController.deleteDenuncia = async (req, res) => {
  // TODO: Validar idDenuncia
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

DenunciasController.getDenuncia = async (req, res) => {
  try {
    const { numeroDenuncia, anonimo, numeroIdentificacion, tipoIdentificacion } = matchedData(req)

    if (!anonimo) {
      const queryInterviniente = 'SELECT t2.* FROM interviniente_denuncia t1 INNER JOIN interviniente t2 ON t1.id_interviniente = t2.id WHERE t1.id_denuncia = ? AND t2.numero_identificacion = ? AND t2.tipo_identificacion = ?'


      const existIntervinientes = await queryHandler(queryInterviniente, [numeroDenuncia, numeroIdentificacion, tipoIdentificacion])

      if (!existIntervinientes.length) throw new Error('La denuncia no coincide con el numero y tipo de identificacion')
    }



    const query = 'SELECT competencia, fecha_denuncia, hora_denuncia, fecha_ratificacion FROM denuncia WHERE id_denuncia = ? AND anonimo = ? LIMIT 1'
    const [denuncia] = await queryHandler(query, [numeroDenuncia, anonimo])

    if (!denuncia) throw new Error('Denuncia no encontrada')

    res.status(200).json({
      ok: true,
      data: denuncia
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res, 500, "500 SERVER ERROR", false, error.message)
  }
}

//CREAR DENUNCIAS


DenunciasController.createDenunciaGeneral = async (req, res) => {
  try {

    const data = matchedData(req)

    const keys = Object.keys(data).map(key => convertToSnakeCase(key))
    const values = Object.values(data)

    const query = `INSERT INTO denuncia(${keys.join(', ')},estado,fecha_denuncia,hora_denuncia) VALUES (${keys.map(key => "?").join(', ')},1,CURDATE(),CURTIME())`

    const resQuery = await queryHandler(query, values)


    res.status(200).json({
      ok: true,
      message: "Denuncia creada",
      id: resQuery.insertId
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }

}

DenunciasController.createDenunciaGenero = async (req, res) => {
  try {

    const data = matchedData(req)
    const keys = Object.keys(data).map(key => convertToSnakeCase(key))
    const values = Object.values(data)

    let valoracion = 0
    Object.keys(data).filter(key => key !== "idDenuncia").forEach(clave => {
      valoracion += parseInt(data[clave])
    });

    const query = `INSERT INTO denuncia_violencia_genero(${keys.join(', ')},valoracion) VALUES (${keys.map(key => "?").join(', ')},${valoracion})`

    const resQuery = await queryHandler(query, values)

    res.status(200).json({
      ok: true,
      message: "Denuncia de Genero creada",
      id: resQuery.insertId
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }
}

DenunciasController.createDenunciaFamiliar = async (req, res) => {
  try {

    const data = matchedData(req)
    const keys = Object.keys(data).map(key => convertToSnakeCase(key))

    const values = Object.values(data)

    const query = `INSERT INTO denuncia_violencia_familiar(${keys.join(', ')}) VALUES (${keys.map(key => "?").join(', ')})`

    const resQuery = await queryHandler(query, values)

    res.status(200).json({
      ok: true,
      message: "Denuncia de Violencia de Genero creada",
      id: resQuery.insertId
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }
}

DenunciasController.createDenunciaAbigeato = async (req, res) => {
  try {

    const data = matchedData(req)
    const keys = Object.keys(data).map(key => convertToSnakeCase(key))
    const values = Object.values(data)

    const query = `INSERT INTO denuncia_abigeato(${keys.join(', ')}) VALUES (${keys.map(key => "?").join(', ')})`


    const resQuery = await queryHandler(query, values)

    res.status(200).json({
      ok: true,
      message: "Denuncia Abigeato creada",
      id: resQuery.insertId
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }
}

DenunciasController.createDenunciaAbigeatoDetalles = async (req, res) => {
  try {

    const data = matchedData(req)

    const resQueries = await Promise.all(detalle => {
      const keys = Object.keys(detalle).map(key => convertToSnakeCase(key))
      const values = Object.values(detalle)

      const query = `INSERT INTO denuncia_abigeato_detalles(${keys.join(', ')}) VALUES (${keys.map(key => "?").join(', ')})`

      return queryHandler(query, values)
    })


    res.status(200).json({
      ok: true,
      message: "Detalles de abigeato creado",
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }
}

DenunciasController.createDenunciaPropiedad = async (req, res) => {
  try {

    const data = matchedData(req)
    const keys = Object.keys(data).map(key => convertToSnakeCase(key))
    const values = Object.values(data)


    const query = `INSERT INTO denuncia_propiedad(${keys.join(', ')}) VALUES (${keys.map(key => "?").join(', ')})`

    const resQuery = await queryHandler(query, values)

    res.status(200).json({
      ok: true,
      message: "Denuncia contra la Propiedad creada",
      id: resQuery.insertId
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }
}

DenunciasController.createDenunciaDelitosPersonas = async (req, res) => {
  try {

    const data = matchedData(req)
    const keys = Object.keys(data).map(key => convertToSnakeCase(key))
    const values = Object.values(data)

    const query = `INSERT INTO denuncia_delitos_personas(${keys.join(', ')}) VALUES (${keys.map(key => "?").join(', ')})`

    const resQuery = await queryHandler(query, values)

    res.status(200).json({
      ok: true,
      message: "Denuncia de Delito a Persona creada",
      id: resQuery.insertId
    })

  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }

}

DenunciasController.createDenunciaIncidenteVial = async (req, res) => {

  try {

    const data = matchedData(req)
    const keys = Object.keys(data).map(key => convertToSnakeCase(key))
    const values = Object.values(data)

    const query = `INSERT INTO denuncia_incidentes_viales(${keys.join(', ')}) VALUES (${keys.map(key => "?").join(', ')})`

    const resQuery = await queryHandler(query, values)

    res.status(200).json({
      ok: true,
      message: "Denuncia de incidente vial creada",
      id: resQuery.insertId
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }
}

DenunciasController.createDenunciaDelitosSexuales = async (req, res) => {

  try {

    const data = matchedData(req)
    const keys = Object.keys(data).map(key => convertToSnakeCase(key))
    const values = Object.values(data)

    const query = `INSERT INTO denuncia_delitos_sexuales(${keys.join(', ')}) VALUES (${keys.map(key => "?").join(', ')})`

    const resQuery = await queryHandler(query, values)

    res.status(200).json({
      ok: true,
      message: "Denuncia de Delito Sexual creada",
      id: resQuery.insertId
    })

  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }
}

DenunciasController.createDenunciaIncidenteVialVehiculo = async (req, res) => {

  try {

    const data = matchedData(req)


    const resQueries = await Promise.all(data.map(vehiculo => {
      const keys = Object.keys(vehiculo).map(key => convertToSnakeCase(key))
      const values = Object.values(vehiculo)

      const query = `INSERT INTO denuncia_incidentes_viales_vehiculos(${keys.join(', ')}) VALUES (${keys.map(key => "?").join(', ')})`

      return queryHandler(query, values)
    }))

    res.status(200).json({
      ok: true,
      message: "vehiculos de incidente vial creado",
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }
}

DenunciasController.createDenunciaDanos = async (req, res) => {
  try {

    const data = matchedData(req)
    const keys = Object.keys(data).map(key => convertToSnakeCase(key))
    const values = Object.values(data)

    const query = `INSERT INTO denuncia_danos(${keys.join(', ')}) VALUES (${keys.map(key => "?").join(', ')})`

    const resQuery = await queryHandler(query, values)

    res.status(200).json({
      ok: true,
      message: "Denuncia de Daños creada",
      id: resQuery.insertId
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }
}

DenunciasController.createDenunciaMaltratoAnimal = async (req, res) => {
  try {

    const data = matchedData(req)
    const keys = Object.keys(data).map(key => convertToSnakeCase(key))
    const values = Object.values(data)

    const query = `INSERT INTO denuncia_maltrato_animal(${keys.join(', ')}) VALUES (${keys.map(key => "?").join(', ')})`

    const resQuery = await queryHandler(query, values)

    res.status(200).json({
      ok: true,
      message: "Denuncia de Maltrato Animal creada",
      id: resQuery.insertId
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }
}

DenunciasController.createDenunciaBusquedaPersona = async (req, res) => {
  try {

    const data = matchedData(req)
    const keys = Object.keys(data).map(key => convertToSnakeCase(key))
    const values = Object.values(data)

    const query = `INSERT INTO denuncia_busqueda_persona(${keys.join(', ')}) VALUES (${keys.map(key => "?").join(', ')})`

    const resQuery = await queryHandler(query, values)

    res.status(200).json({
      ok: true,
      message: "Denuncia de Busqueda de Persona creada",
      id: resQuery.insertId
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }
}

DenunciasController.uploadFile = async (req, res) => {
  try {
    const idDenuncia = req.params.id

    req.files && await Promise.all(req.files.map((file) => {
      const query = `INSERT INTO denuncia_adjuntos(id_denuncia, nombre_original, nombre_archivo, fecha, estado) VALUES(?,?,?,NOW(),1)`

      return queryHandler(query, [idDenuncia, file.originalname, file.filename])
    }))

    res.status(200).json({
      ok: true,
      message: "Files uploaded",
    })
  } catch (error) {
    showError(error)
    httpErrorHandler(res)
  }
}





module.exports = DenunciasController

