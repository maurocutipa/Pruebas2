const HttpErrorHandler = require("../utils/httpErrorHandler")
const queryHandler = require("../utils/queryHandler")
const showError = require("../utils/showError")

const AuditoriaController = {}

AuditoriaController.denunciaAuditoria  = async (req, res) => {
  try {

    let { idDenuncia, idUsuario, ip, actividad, detalle } = req

    const query = `INSERT INTO denuncia_auditoria (id_denuncia,id_usuario,ip,actividad,detalle,fecha) VALUES (?,?,?,?,?,NOW())`;

    const queryResult = await queryHandler(query, [idDenuncia, idUsuario, ip, actividad, detalle]);

    res.status(200).json({
      ok: true,
      message: 'Auditoria creada'
    })
  } catch (error) {
    showError(error)
    HttpErrorHandler(res)
  }
}

module.exports = AuditoriaController