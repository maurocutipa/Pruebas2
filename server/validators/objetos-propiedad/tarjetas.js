const { body,check } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateTarjetas = [

    body("idDenunciaPropiedad").
        if(check("id").exists()).
        not().exists().notEmpty(),

    body("tipo").
        optional().isIn(['Debito','Credito']),   
    body("banco").
        optional(),
    body("numero").
        optional(),
    body("observaciones").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateTarjetas