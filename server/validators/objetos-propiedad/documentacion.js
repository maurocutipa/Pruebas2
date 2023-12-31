const { body,check } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateDocumentacion = [

    body("idDenunciaPropiedad").
        if(check("id").exists()).
        not().exists().notEmpty(),

    body("tipo").
        optional().isIn(['Cedula de Identidad','Certificado','Certificado de Nacionalidad','Cuil','Cuit','DNI','Libreta Civica','Libreta de Enrolamiento','Otros','Pasaporte']),   
    body("numero").
        optional(),
    body("observaciones").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateDocumentacion