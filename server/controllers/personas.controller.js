const httpErrorHandler = require("@utils/httpErrorHandler");
const queryHandler = require("@utils/queryHandler");
const safeConcatQuery = require("@utils/safeConcatQuery");
const showError = require("@utils/showError");
const sendEmail = require("@utils/sendEmail");
const PersonasController = {};

PersonasController.getGrupos = async (req, res) => {
  try {
    let query =
      "SELECT id_notificar_grupos as id, nombre FROM mpa.notificar_grupos where estado = 1;";
    const data = await queryHandler(query);

    res.status(200).json({
      ok: true,
      data,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

PersonasController.getPersonas = async (req, res) => {
  try {
    const { limit, offset } = req.body;

    if (!limit || offset === undefined || offset === null) {
      throw new Error("Faltan parametros");
    }

    let query =
      "SELECT distinct mail, nombre FROM notificar_grupos_listado WHERE estado = 1 ORDER BY nombre LIMIT ? OFFSET ?";

    let data = await queryHandler(query, [limit, offset]);

    data = [{ nombre: "PERSONAL EXTERNO", mail: "" }, ...data];

    res.status(200).json({
      ok: true,
      data,
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
};

PersonasController.enviarNotificaciones = async (req, res) => {
  try {
    let { notificaciones, asunto, observaciones } = req.body;

    if (!notificaciones) {
      throw new Error("Faltan parametros");
    }

    let emails = [];

    await Promise.all(notificaciones.map(async noti => {
      //get id depending of type
      if(noti.tipo?.toUpperCase() === 'GRUPO'){
        let query = "SELECT id_notificar_grupos as id FROM notificar_grupos where nombre LIKE ? LIMIT 1";
        const data = await queryHandler(query, [noti.nombre]);
        noti.id = data[0]?.id;

        //OBTENER CORREOS DEL GRUPO
        query = "SELECT mail FROM notificar_grupos_listado WHERE idper_grupos = ? AND estado = 1";
        const mails = await queryHandler(query, [noti.id]);

        mails?.forEach(({mail}) => {
          if(!emails.includes(mail)){
            emails = [...emails, mail];
          }
        })
      }
      else if(noti.tipo?.toUpperCase() === 'PERSONA'){
        let query = "SELECT id_notificar_grupos_listado as id FROM notificar_grupos_listado WHERE mail LIKE ? LIMIT 1";
        const data = await queryHandler(query, [noti.mail]);
        noti.id = data[0]?.id;

        //AGREGAR CORREO DE LA PERSONA
        if(!emails.includes(noti.mail)) emails = [...emails, noti.mail];
      }

      let query = "INSERT INTO notificaciones_enviadas(id_tipo, tipo, mail, destinatario,tipo_destinatario, fecha, estado) VALUES (?, ?, ?, ?, ?, NOW(), 1);";
      await queryHandler(query, [noti.id, noti.tipoNotificacion, noti.mail, noti.nombre, noti.tipo]);

      //ENVIO DE CORREO
      return true;
    }))

    //send email
    if(process.env.ENABLE_SEND_EMAIL === 'true'){
      let res = await sendEmail(emails, asunto, observaciones, true);
      if(!res) throw new Error('Error al enviar correos');
      console.log('Emails enviados');
    }

    res.status(200).json({
      message: 'La denuncia se convirtio en no penal y se enviaron los correos',
      data: {},
    });
  } catch (error) {
    showError(error);
    httpErrorHandler(res);
  }
}

module.exports = PersonasController;
