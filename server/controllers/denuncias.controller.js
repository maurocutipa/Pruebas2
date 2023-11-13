const httpErrorHandler = require('../utils/httpErrorHandler');
const queryHandler = require('../utils/queryHandler');
const { formatDate } = require('../utils/formatDate');

const getDenuncias = async (req, res) => {
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

const getDenunciaById = async (req, res) => {
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
      },
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

    res.status(200).json({
      message: 'Denuncia eliminada con éxito',
      data: { id: req.params.id },
    });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

module.exports = {
  getDenuncias,
  getDatosDeFiltros,
  deleteDenuncia,
  getDenunciaById,
};
