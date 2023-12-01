const { body, check } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateTelefonos = [
    body("idDenunciaPropiedad").
        if(check("id").exists()).
        not().exists().notEmpty(),

    body("imei").
        optional().isNumeric(),
    body("idDenunciaCelularesMarca").
        optional().isNumeric(),
    body("modelo").
        optional(),   
    body("numero").
        optional().isNumeric(),
    body("empresa").
        optional(),
    body("otro").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports =  validateTelefonos