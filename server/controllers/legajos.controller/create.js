const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const dayjs = require('dayjs');

const CreateController = {};

CreateController.crearDenunciaLegajo = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

  try {
    // ============================= OBTENER LA LETRA DEL SECTOR =====================================
    query = `
        SELECT
          j.letra,
          j.id_jurisdiccion AS idJurisdiccion
        FROM sectores s
        LEFT JOIN jurisdicciones j ON j.id_jurisdiccion = s.id_jurisdiccion
        WHERE id_sector = ?
      `;

    const [sector] = await queryHandler(query, [body.fiscalia]);

    // ============================= OBTENER EL NUMERO DEL LEGAJO =====================================
    query = `
        SELECT
          MAX(l.nro_exp) AS nroExp
        FROM legajo l
        WHERE l.letra = ?
      `;
    const [legajo] = await queryHandler(query, [sector.letra]);

    // ============================= CREAR LEGAJO =====================================
    // TODO: fiscal_encargado
    query = `
        INSERT INTO
          legajo (letra, nro_exp, id_denuncia, id_sector, id_juridiccion, fecha_ingreso, id_user_ingreso)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

    let newNroExpediente = legajo.nroExp ? legajo.nroExp + 1 : 1;
    let values = [
      sector.letra,
      newNroExpediente,
      body.idDenuncia,
      body.fiscalia,
      sector.idJurisdiccion,
      currentDate,
      req.idUsuario,
    ];
    const nuevoLegajo = await queryHandler(query, values);

    // ============================= CREAR LOS DELITOS =====================================
    const intervinientesDelitos = body.delitos;
    await Promise.all(
      intervinientesDelitos.map((i) => {
        const query = `
          INSERT INTO
            interviniente_delito (id_legajo, id_interviniente, id_delito, estado)
          VALUES (?, ?, ?, 1)`;

        const values = [nuevoLegajo.insertId, i.denunciado, i.delito];
        return queryHandler(query, values);
      })
    );

    // ============================= CREAR RESUMEN DE LOS HECHOS =====================================
    const resumenHechos = body.resumenHechos;
    await Promise.all(
      resumenHechos.map(async (r) => {
        let query = `
            INSERT INTO
              legajo_resumen_hechos (id_legajo, descripcion, id_user_create, estado) 
            VALUES (?, ?, ?, 1)
          `;

        let values = [nuevoLegajo.insertId, r.descripcion, req.idUsuario];
        const resumenHecho = await queryHandler(query, values);

        query = `
            INSERT INTO
              legajo_resumen_intervinientes (id_legajo_resumen_hecho, id_interviniente, estado) 
            VALUES (?, ?, 1)
          `;
        values = [resumenHecho.insertId, r.denunciado];

        return queryHandler(query, values);
      })
    );

    // ============================= CREAR DETENIDOS =====================================
    const detenidos = body.detenidos;
    await Promise.all(
      detenidos.map((d) => {
        const query = `
        INSERT INTO
          interviniente_preso (id_interviniente, id_legajo, fecha_desde, id_user_alta, fecha_alta, juez, lugar_detencion)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

        const values = [
          d.denunciado,
          nuevoLegajo.insertId,
          new Date(d.fechaHoraDetencion),
          req.idUsuario,
          currentDate,
          d.juezDetencion,
          d.lugarDetencion,
        ];
        return queryHandler(query, values);
      })
    );

    // ============================= MODIFICAR DENUNCIA =====================================
    query = `
        UPDATE denuncia 
          SET denuncia.id_legajo = ?,
          denuncia.accion = 'PENAL'
        WHERE denuncia.id_denuncia = ?
      `;
    values = [nuevoLegajo.insertId, body.idDenuncia];
    await queryHandler(query, values);

    res.status(200).json({
      message: 'Se creo un nuevo legajo de denuncia',
      data: {},
    });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

CreateController.archivarDenuncia = async (req, res) => {
  const body = req.body;

  try {
    let query = `
      INSERT INTO
        denuncia_archivada (id_denuncia, motivos_archivo)
      VALUES (?, ?)
    `;

    await queryHandler(query, [body.idDenuncia, body.motivosArchivo]);

    query = `
      UPDATE denuncia 
        SET denuncia.accion = 'ARCHIVO'
      WHERE denuncia.id_denuncia = ?
    `;

    values = [body.idDenuncia];
    await queryHandler(query, values);

    res.status(200).json({
      message: 'Se archivo la denuncia',
      data: {},
    });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

CreateController.crearDenunciaNoPenal = async (req, res, next) => {
  const body = req.body;

  try {
    let query = `
      INSERT INTO
        denuncia_no_penal (id_denuncia, competencia, remision, asunto, observaciones)
      VALUES (?, ?, ?, ?, ?)
    `;

    await queryHandler(query, [
      body.idDenuncia,
      body.competencia,
      body.remision,
      body.asunto,
      body.observaciones,
    ]);

    query = `
      UPDATE denuncia 
        SET denuncia.accion = 'OTRO'
      WHERE denuncia.id_denuncia = ?
    `;

    values = [body.idDenuncia];
    await queryHandler(query, values);

    next();
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

module.exports = CreateController;
