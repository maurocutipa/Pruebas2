const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const safeConcatQuery = require('@utils/safeConcatQuery');
const convertToSnakeCase = require('@utils/convertToSnakeCase');
const { matchedData } = require('express-validator');
const showError = require('@utils/showError');
const { formatDate } = require('@utils/formatDate');

const GetController = {};

GetController.getDenuncias = async (req, res) => {
  const { limit, offset } = req.body;

  let filters = ``;
  let filterValues = [];

  if (req.body.idDenuncia) {
    filters += ` AND d.id_denuncia like ?`;
    filterValues = [...filterValues, req.body.idDenuncia];
  }

  if (req.body.tipoDenuncia) {
    filterValues = [...filterValues, req.body.tipoDenuncia];
    filters += ` AND d.id_tipo_denuncia like ?`;
  }

  if (req.body.seccional) {
    filterValues = [...filterValues, req.body.seccional];
    filters += ` AND d.id_seccional like ?`;
  }

  if (req.body.idLegajo) {
    filterValues = [...filterValues, req.body.idLegajo];
    filters += ` AND d.id_legajo like ?`;
  }

  if (req.body.competencia) {
    filterValues = [...filterValues, req.body.competencia];
    filters += ` AND d.competencia like ?`;
  }

  if (req.body.realizacion) {
    filterValues = [...filterValues, req.body.realizacion];
    filters += ` AND d.realizacion like ?`;
  }

  if (req.body.fiscaliaAsignada && req.body.fiscaliaAsignada) {
    filterValues = [...filterValues, req.body.fiscaliaAsignada];
    filters += ` AND sc.id_sector like ?`;
  }

  if (req.body.fechaDenunciaDesde && req.body.fechaDenunciaHasta) {
    filterValues = [
      ...filterValues,
      formatDate(req.body.fechaDenunciaDesde),
      formatDate(req.body.fechaDenunciaHasta),
    ];
    filters += ` AND d.fecha_denuncia BETWEEN ? AND ? `;
  }

  if (req.body.ratificacion) {
    filterValues = [...filterValues, req.body.ratificacion];
    filters += ` AND d.ratificacion like ?`;
  }

  try {
    let query = `
        SELECT 
          COUNT(*) AS total_records
        FROM denuncia d
        LEFT JOIN legajo l ON d.id_legajo = l.id_legajo
        LEFT JOIN sectores sc ON l.id_sector = sc.id_sector
        WHERE d.estado = 1 ${filters};`;
    const count = await queryHandler(query, filterValues);

    query = `
        SELECT
            d.id_denuncia AS idDenuncia,
            d.fecha_denuncia AS fechaDenuncia,
            d.hora_denuncia AS horaDenuncia,
            d.realizacion,
            d.ratificacion,
            d.competencia,
            td.nombre AS tipoDenuncia,
            s.nombre AS seccional,
            l.id_legajo AS idLegajo,
            l.letra AS letra,
            l.nro_exp AS nroExp,
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
    const denuncias = await queryHandler(query, [
      ...filterValues,
      limit,
      offset,
    ]);

    res.status(200).json({
      message: 'ok',
      data: { denuncias, totalRecords: count[0]['total_records'] },
    });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

GetController.getDenunciaById = async (req, res) => {
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
          d.competencia,
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

    // ============================= Querys Adjuntos =====================================

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

    // ============================== Querys para denuncias de propiedad. ======================================

    let automoviles,
      autopartes,
      bicicletas,
      cheques,
      documentacion,
      otro,
      tarjetas,
      telefonos;

    query = ` 
      SELECT 
        p.id_denuncia_propiedad as idDenunciaPropiedad,
        p.id_denuncia as idDenuncia,
        p.dano_cosas as danoCosas,
        p.armas,
        p.violencia_fisica as violenciaFisica,
        p.amenaza, 
        p.arrebato, 
        p.otra, 
        p.cant_telefonos as cantTelefonos, 
        p.cant_automoviles as cantAutomoviles, 
        p.cant_bicicletas as cantBicicletas, 
        p.cant_autopartes as cantAutopartes, 
        p.cant_documentacion as cantDocumentacion, 
        p.cant_tarjetas as cantTarjetas, 
        p.cant_cheques as cantCheques, 
        p.cant_otros as cantOtros
      FROM denuncia_propiedad p
      WHERE id_denuncia = ?;
    `;
    const [datosGeneralesDenunciaPropiedad] = await queryHandler(query, [id]);

    if (datosGeneralesDenunciaPropiedad !== undefined) {
      query = `
        SELECT 
        *
        FROM denuncia_propiedad_automoviles WHERE id_denuncia_propiedad = ? 
        `;
      automoviles = await queryHandler(query, [
        datosGeneralesDenunciaPropiedad.idDenunciaPropiedad,
      ]);

      query = `
        SELECT
        *
        FROM denuncia_propiedad_autopartes WHERE id_denuncia_propiedad = ? 
        `;
      autopartes = await queryHandler(query, [
        datosGeneralesDenunciaPropiedad.idDenunciaPropiedad,
      ]);

      query = `
        SELECT
        *
        FROM denuncia_propiedad_bicicletas WHERE id_denuncia_propiedad = ? 
        `;
      bicicletas = await queryHandler(query, [
        datosGeneralesDenunciaPropiedad.idDenunciaPropiedad,
      ]);

      query = `
        SELECT
        *
        FROM denuncia_propiedad_cheques WHERE id_denuncia_propiedad = ? 
        `;
      cheques = await queryHandler(query, [
        datosGeneralesDenunciaPropiedad.idDenunciaPropiedad,
      ]);

      query = `
        SELECT
        *
        FROM denuncia_propiedad_documentacion WHERE id_denuncia_propiedad = ? 
        `;
      documentacion = await queryHandler(query, [
        datosGeneralesDenunciaPropiedad.idDenunciaPropiedad,
      ]);

      query = `
        SELECT
        *
        FROM denuncia_propiedad_otro WHERE id_denuncia_propiedad = ? 
        `;
      otro = await queryHandler(query, [
        datosGeneralesDenunciaPropiedad.idDenunciaPropiedad,
      ]);

      query = `
        SELECT
        *
        FROM denuncia_propiedad_tarjetas WHERE id_denuncia_propiedad = ? 
        `;
      tarjetas = await queryHandler(query, [
        datosGeneralesDenunciaPropiedad.idDenunciaPropiedad,
      ]);

      query = `
        SELECT
        *
        FROM denuncia_propiedad_telefonos WHERE id_denuncia_propiedad = ? 
        `;
      telefonos = await queryHandler(query, [
        datosGeneralesDenunciaPropiedad.idDenunciaPropiedad,
      ]);
    }

    // ============================ Fin querys denuncia propiedad ==============================

    // ============================ Querys para incidentes viales ==============================
    let vehiculos;
    query = `
        SELECT 
          incidentes.id_denuncia_incidentes_viales as idDenunciaIncidentesViales, 
          incidentes.id_denuncia as idDenuncia, 
          incidentes.cant_vehiculos as cantVehiculos
        FROM denuncia_incidentes_viales incidentes
        WHERE id_denuncia = ?`;
    const [datosGeneralesIncidentesViales] = await queryHandler(query, [id]);

    if (datosGeneralesIncidentesViales !== undefined) {
      query = `
        SELECT * FROM denuncia_incidentes_viales_vehiculos 
        WHERE id_denuncia_incidentes_viales = ?`;
      vehiculos = await queryHandler(query, [
        datosGeneralesIncidentesViales.idDenunciaIncidentesViales,
      ]);
    }
    //============================= Fin de querys incidentes viales ============================

    // ============================ Querys Violencia de Genero =================================
    query = ` 
        SELECT 
          v.id_denuncia_violencia_genero as idDenunciaViolenciaGenero,
          v.id_denuncia as idDenuncia,
          v.situacion_1 as situacion1,
          v.situacion_2 as situacion2,
          v.tipo_violencia_1 as tipoViolencia1, 
          v.tipo_violencia_2 as tipoViolencia2, 
          v.tipo_violencia_3 as tipoViolencia3, 
          v.tipo_violencia_4 as tipoViolencia4, 
          v.tipo_violencia_5 as tipoViolencia5, 
          v.tipo_violencia_6 as tipoViolencia6, 
          v.tipo_violencia_7 as tipoViolencia7,
          v.perfil_agresor_1 as perfilAgresor1,  
          v.perfil_agresor_2 as perfilAgresor2,  
          v.perfil_agresor_3 as perfilAgresor3,  
          v.perfil_agresor_4 as perfilAgresor4,  
          v.perfil_agresor_5 as perfilAgresor5,  
          v.perfil_agresor_6 as perfilAgresor6,  
          v.perfil_agresor_7 as perfilAgresor7,  
          v.vulnerabilidades_1 as vulnerabilidades1,
          v.vulnerabilidades_2 as vulnerabilidades2,
          v.vulnerabilidades_3 as vulnerabilidades3,
          v.vulnerabilidades_4 as vulnerabilidades4,
          v.valoracion
        FROM denuncia_violencia_genero v
        WHERE id_denuncia = ?`;
    const [datosViolenciaDeGenero] = await queryHandler(query, [id]);
    //========================== Fin Querys Violencia de Genero =================================

    //========================== Querys para Delitos Sexuales ===================================
    query = ` 
    SELECT 
      ds.id_denuncia_delitos_sexuales as idDenunciaDelitosSexuales,
      ds.hecho_acercamiento as hechoAcercamiento,
      ds.hecho_contacto_tecnologico as hechoContactoTecnologico,
      ds.hecho_beso as hechoBeso,
      ds.hecho_tocamiento as hechoTocamiento, 
      ds.hecho_introduccion as hechoIntroduccion, 
      ds.accion_violencia as accionViolencia, 
      ds.accion_drogas as accionDrogas, 
      ds.accion_vulnerabilidad as accionVulnerabilidad, 
      ds.accion_arma as accionArma, 
      ds.accion_aprovecharse as accionAprovecharse, 
      ds.denuncias_previas as denunciasPrevias,
      ds.solicitud_imagenes as solicitudImagenes,  
      ds.menor_involucrado as menorInvolucrado,  
      ds.medios_electronicos as mediosElectronicos
    FROM denuncia_delitos_sexuales ds
    WHERE id_denuncia = ?`;
    const [detallesDelitoSexual] = await queryHandler(query, [id]);

    query = `
    SELECT  
    vic.id_denuncia_victima as idDenunciaVictima, 
    vic.id_denuncia as idDenuncia, 
    vic.id_interviniente as idInterviniente, 
    vic.conocimiento_victima as conocimientoVictima, 
    vic.vinculo_victima as vinculoVictima, 
    vic.detalle_vinculo as detalleVinculo, 
    vic.depende_ingresos as dependeIngresos, 
    vic.hijos_menores as hijosMenores, 
    vic.riesgo_vida as riesgoVida, 
    vic.estado as estado
    FROM denuncia_victima vic
    WHERE id_denuncia = ?`
    const [datosVictima] = await queryHandler(query, [id]);
    //=========================== Fin Querys para delitos Sexuales =======================

    //=========================== Querys Violencia Intrafamiliar =========================

    query = ` 
        SELECT 
          viointra.id_denuncia_violencia_familiar as idDenunciaViolenciaFamiliar,
          viointra.id_denuncia as idDenuncia,
          viointra.situacion_1 as situacion1,
          viointra.situacion_2 as situacion2,
          viointra.situacion_3 as situacion3,
          viointra.situacion_4 as situacion4,
          viointra.tipo_violencia_1 as tipoViolencia1, 
          viointra.tipo_violencia_2 as tipoViolencia2, 
          viointra.tipo_violencia_3 as tipoViolencia3, 
          viointra.tipo_violencia_4 as tipoViolencia4, 
          viointra.tipo_violencia_5 as tipoViolencia5, 
          viointra.tipo_violencia_6 as tipoViolencia6, 
          viointra.perfil_agresor_1 as perfilAgresor1,  
          viointra.perfil_agresor_2 as perfilAgresor2,  
          viointra.perfil_agresor_3 as perfilAgresor3,  
          viointra.perfil_agresor_4 as perfilAgresor4,  
          viointra.perfil_agresor_5 as perfilAgresor5,  
          viointra.perfil_agresor_6 as perfilAgresor6,  
          viointra.victima_1 as victima1,
          viointra.victima_2 as victima2,
          viointra.victima_3 as victima3,
          viointra.victima_4 as victima4,
          viointra.victima_5 as victima5,
          viointra.victima_6 as victima6,
          viointra.victima_7 as victima7,
          viointra.caracteristicas_1 as caracteristicas1, 
          viointra.caracteristicas_2 as caracteristicas2, 
          viointra.caracteristicas_3 as caracteristicas3, 
          viointra.caracteristicas_4 as caracteristicas4, 
          viointra.caracteristicas_5 as caracteristicas5, 
          viointra.caracteristicas_6 as caracteristicas6 
        FROM denuncia_violencia_familiar viointra
        WHERE id_denuncia = ?`;
    const [datosViolenciaIntrafamiliar] = await queryHandler(query, [id]);

    //========================== Fin querys violencia intrafamiliar ======================

    //=================================== Querys abigeato ================================
    let detallesDenunciaAbigeato , detallesEspeciesDenunciaAbigeato= {}; 
    query = `
        SELECT 
          abi.id_denuncia_abigeato as idDenunciaAbigeato, 
          abi.id_denuncia as idDenuncia, 
          abi.violencia_fisica as violenciaFisica
          FROM denuncia_abigeato abi
          WHERE id_denuncia = ?`
    const [datosGeneralesDenunciaAbigeato] = await queryHandler(query, [id]); 
    
    if (datosGeneralesDenunciaAbigeato !== undefined) {
      query = `
      SELECT
        abid.id_denuncia_abigeato_detalles as idDenunciaAbigeatoDetalles, 
        abid.id_denuncia_abigeato as idDenunciaAbigeato, 
        abid.id_denuncia_abigeato_detalles_especies as idDenunciaAbigeatoDetallesEspecies, 
        abid.cantidad as cantidad, 
        abid.detalle as detalle
      FROM denuncia_abigeato_detalles abid
      WHERE abid.id_denuncia_abigeato = ?`;
      detallesDenunciaAbigeato = await queryHandler(query, [datosGeneralesDenunciaAbigeato.idDenunciaAbigeato]);

      query = `
      SELECT 
        abide.id_denuncia_abigeato_detalles as idDenunciaAbigeatoDetalles, 
        abide.id_denuncia_abigeato_detalles_especies as idDenunciaAbigeatoEspecies, 
        abide.cantidad as cantidad, 
        abide.detalle as detalle
      FROM denuncia_abigeato_detalles abide
      WHERE abide.id_denuncia_abigeato = ?`;
      [detallesEspeciesDenunciaAbigeato] = await queryHandler(query, [datosGeneralesDenunciaAbigeato.idDenunciaAbigeato]);
    }

    //================================== Fin Querys Abigeato ================================

    //================================= Querys Maltrato animal ==============================
    query = `
      SELECT 
        ma.id_denuncia_maltrato_animal as idDenunciaMaltratoAnimal, 
        ma.id_denuncia as idDenuncia, 
        ma.condicion_animal as condicionAnimal, 
        ma.atencion_veterinaria as atencionVeterinaria, 
        ma.relacion_animal as relacionAnimal, 
        ma.tipo_animal as tipoAnimal, 
        ma.tomo_conocimiento as tomoConocimiento, 
        ma.convivencia_indeterminado as convivenciaIndeterminado, 
        ma.convivencia_adultos_mayores as convivenciaAdultosMayores, 
        ma.convivencia_ninos as convivenciaNinos, 
        ma.convivencia_otro as convivenciaOtro, 
        ma.convivencia_discapacidad as convivenciaDiscapacidad, 
        ma.violencia_cometida as violenciaCometida, 
        ma.abuso_animal as abusoAnimal, 
        ma.abuso_funcionario as abusoFuncionario
        FROM denuncia_maltrato_animal ma
        WHERE ma.id_denuncia = ?`
    const [datosDenunciaMaltratoAnimal] = await queryHandler(query, [id]);
    // =========================== Fin Querys Maltrato Animal =============================

    // ========================= Querys Delitos contra la persona =========================
    query = `
      SELECT
        dp.id_denuncia_delitos_personas as idDenunciaDelitosPersonas, 
        dp.id_denuncia as idDenuncia, 
        dp.femicidio as femicidio, 
        dp.lesiones as lesiones, 
        dp.homicidio as homicidio
        FROM denuncia_delitos_personas dp
        WHERE dp.id_denuncia = ?`
    const [datosDenunciaDelitosPersonas] = await queryHandler(query, [id]); 
    // ========================= Fin de querys delitos contra personas =====================

    // ====================================== Querys daños =================================
    query = `
      SELECT 
        dan.id_denuncia_danos as idDenunciaDanos, 
        dan.id_denuncia as idDenuncia, 
        dan.dano_animal as danoAnimal, 
        dan.dano_cosa_material as danoCosaMaterial, 
        dan.dano_inmueble as danoInmueble, 
        dan.dano_sistema_informatico as danoSistemaInformatico, 
        dan.consecuencia_dano as consecuenciaDano, 
        dan.consecuencia_destruccion as consecuenciaDestruccion, 
        dan.consecuencia_detalles_otro as consecuenciaDetallesOtro, 
        dan.consecuencia_inutilizacion as consecuenciaInutilizacion, 
        dan.consecuencia_desaparicion as consecuenciaDesaparicion,
        dan.consecuencia_otro as consecuenciaOtro,
        dan.pertenencia as pertenencia
        FROM denuncia_danos dan
        WHERE dan.id_denuncia = ?`
    const [datosDenunciaDanos] = await queryHandler(query, [id]); 
    // =================================== Fin Querys daños =================================

    res.status(200).json({
      message: `Denuncia con el id: ${id}`,
      data: {
        denuncia: denuncia[0],
        intervinientes: { victimas, denunciados, testigos },
        adjuntos: adjuntos,
        datosDenunciaPropiedad: {
          datosGeneralesDenunciaPropiedad,
          automoviles,
          autopartes,
          bicicletas,
          cheques,
          documentacion,
          otro,
          tarjetas,
          telefonos,
        },
        datosIncidentesViales: { datosGeneralesIncidentesViales, vehiculos },
        datosViolenciaDeGenero: datosViolenciaDeGenero,
        datosDelitoSexual: {
          detallesDelitoSexual,
          datosVictima
        },
        datosViolenciaIntrafamiliar: datosViolenciaIntrafamiliar, 
        datosDenunciaAbigeato: {
          datosGeneralesDenunciaAbigeato, 
          detallesDenunciaAbigeato, 
          detallesEspeciesDenunciaAbigeato
        },
        datosDenunciaMaltratoAnimal: datosDenunciaMaltratoAnimal,
        datosDenunciaDelitosPersonas: datosDenunciaDelitosPersonas,
        datosDenunciaDanos: datosDenunciaDanos
      },
    });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

GetController.getDatosDeFiltros = async (req, res) => {
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

GetController.getDenuncia = async (req, res) => {
  try {
    const {
      numeroDenuncia,
      anonimo,
      numeroIdentificacion,
      tipoIdentificacion,
    } = matchedData(req);

    if (!anonimo) {
      const queryInterviniente =
        'SELECT t2.* FROM interviniente_denuncia t1 INNER JOIN interviniente t2 ON t1.id_interviniente = t2.id WHERE t1.id_denuncia = ? AND t2.numero_identificacion = ? AND t2.tipo_identificacion = ?';

      const existIntervinientes = await queryHandler(queryInterviniente, [
        numeroDenuncia,
        numeroIdentificacion,
        tipoIdentificacion,
      ]);

      if (!existIntervinientes.length)
        throw new Error(
          'La denuncia no coincide con el numero y tipo de identificacion'
        );
    }

    const query =
      'SELECT competencia, fecha_denuncia, hora_denuncia, fecha_ratificacion FROM denuncia WHERE id_denuncia = ? AND anonimo = ? LIMIT 1';
    const [denuncia] = await queryHandler(query, [numeroDenuncia, anonimo]);

    if (!denuncia) throw new Error('Denuncia no encontrada');

    res.status(200).json({
      ok: true,
      data: denuncia,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res, 500, '500 SERVER ERROR', false, error.message);
  }
};

GetController.getResumenParaRatificar = async (req, res) => {
  const { id } = req.params;

  try {
    let query = `
        SELECT
          -- Resumen de la denuncia
          d.fecha_denuncia AS fechaDenuncia,
          d.hora_denuncia AS horaDenuncia,
          dt.nombre as tipoDenuncia,
          -- Datos del hecho
          d.certeza_lugar AS certezaLugar,
          d.fecha_hecho AS fechaHecho,
          d.hora_hecho AS horaHecho,
  
          l.nombre as localidad,
          d.certeza_lugar AS certezaLugar,
          d.anonimo,
          d.departamento_hecho AS departamentoHecho,
          d.piso_hecho AS pisoHecho,
          d.detalle_lugar AS detalleLugar,
          d.datos_denunciado AS datosDenunciado,
          d.datos_testigo AS datosTestigo
  
        FROM denuncia d
        LEFT JOIN denuncia_tipos dt ON dt.id_tipo_denuncia = d.id_tipo_denuncia
        LEFT JOIN localidades l ON l.id_localidad = d.id_localidad
        WHERE id_denuncia = ?
      `;
    const [resumen] = await queryHandler(query, [id]);
    if (!resumen) {
      return res.status(404).json({
        message: `Denuncia con el id: ${id} no existe`,
        data: { resumen },
      });
    }

    query = `
      SELECT 
        i.id,
        i.tipo_persona AS tipoPersona,
        i.nombre,
        i.apellido,
        i.tipo_identificacion AS tipoIdentificacion,
        i.numero_identificacion AS numeroIdentificacion,
        i.email,
        i.informacion_adicional AS informacionAdicional,
        i.telefono_movil AS telefonoMovil,
        i.telefono_fijo AS telefonoFijo,
        it.tipo_interviniente AS tipoInterviniente,
        it.nombre_tipo AS nombreTipo,
        p.nombre_provincia AS nombreProvincia,
        l.nombre as localidad,
        i.domicilio
  
      FROM interviniente_denuncia id
      LEFT JOIN interviniente i ON id.id_interviniente = i.id
      LEFT JOIN interviniente_tipo it ON i.id_interviniente_tipo = it.id_interviniente_tipo
      LEFT JOIN localidades l ON l.id_localidad = i.id_localidad
      LEFT JOIN provincias p ON p.id_provincia = i.id_provincia
      WHERE id_denuncia = ?`;
    const intervinientes = await queryHandler(query, [id]);

    query = `
        SELECT 
          id_comprobante AS idComprobante,
          nombre_original AS nombreOriginal,
          nombre_archivo AS nombreArchivo
        FROM denuncia_comprobante
        WHERE id_denuncia = ? AND estado = 1
        `;
    const [comprobante] = await queryHandler(query, [id]);

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
      message: `Resumen de la denuncia #${id}`,
      data: { resumen, victimas, denunciados, testigos, comprobante },
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res, 500, '500 SERVER ERROR', false, error.message);
  }
};

GetController.estaRatificada = async (req, res) => {
  const { id } = req.params;

  try {
    let query = `SELECT ratificacion FROM denuncia WHERE id_denuncia = ?`;

    const [denuncia] = await queryHandler(query, [id]);
    let estaRatificada = denuncia.ratificacion === 'SI' ? true : false;

    res.status(200).json({
      message: 'ok',
      data: { estaRatificada },
    });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

module.exports = GetController;
