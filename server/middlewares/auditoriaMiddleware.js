const HttpErrorHandler = require("../utils/httpErrorHandler")
const queryHandler = require("../utils/queryHandler")
const showError = require("../utils/showError")

const AuditoriaMiddleware = async (req, res) => {
  try {
  
    let { denuncia, idUsuario, ip , actividad}  = req

    const query = `insert into denuncia_auditoria (id_denuncia,id_usuario,ip,actividad,detalle,fecha) values (?,?,?,?,?,CURDATE())`;

    let detalle = ""
    
    if (actividad == "CREAR DENUNCIA"){
      detalle =  `se creo una denuncia de tipo ${denuncia.tipoDenuncia}`
    }
    else{
      detalle = `hola`
    }
    


    const queryResult = await queryHandler(query,[denuncia.idDenuncia,idUsuario,ip,actividad,detalle]);
    

  } catch (error) {
    showError(error)
    HttpErrorHandler(res)
}
}

module.exports = AuditoriaMiddleware