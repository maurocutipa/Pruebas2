const httpErrorHandler = require('@utils/httpErrorHandler');
const queryHandler = require('@utils/queryHandler');
const dayjs = require('dayjs');

const CreateController = {};

CreateController.crearDenunciaLegajo = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    let query = `
        SELECT
          accion
        FROM denuncia
        WHERE id_denuncia = ? 
      `;
    const [denuncia] = await queryHandler(query, [body.idDenuncia]);
    if (denuncia.accion) {
      return res
        .status(400)
        .json({ message: 'Ya se tomaron acciones para esta denuncia' });
    }

    query = `
        SELECT
          j.letra,
          j.id_jurisdiccion AS idJurisdiccion
        FROM sectores s
        LEFT JOIN jurisdicciones j ON j.id_jurisdiccion = s.id_jurisdiccion
        WHERE id_sector = ?
      `;

    // Letra del sector: sector.letra
    const [sector] = await queryHandler(query, [body.fiscalia]);

    query = `
        SELECT
          MAX(l.nro_exp) AS nroExp
        FROM legajo l
        WHERE l.letra = ?
      `;
    // Nro maximo del expediente dada la letra: legajo.nroExp
    const [legajo] = await queryHandler(query, [sector.letra]);

    const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');

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

    // TODO: fiscal_encargado
    query = `
        INSERT INTO
          legajo (letra, nro_exp, id_denuncia, id_sector, id_juridiccion, fecha_ingreso, id_user_ingreso)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
    const nuevoLegajo = await queryHandler(query, values);

    // Insertar los delitos e intervinientes
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

CreateController.crearDenunciaNoPenal = async (req, res) => {
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

    res.status(200).json({
      message: 'La denuncia se convirtio en no penal',
      data: {},
    });
  } catch (error) {
    console.log(error);
    httpErrorHandler(res);
  }
};

module.exports = CreateController;
