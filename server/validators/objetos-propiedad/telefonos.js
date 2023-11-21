const { body } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateTelefonos = [
    body().exists().not().isEmpty().isArray(),
    body("*.idDenunciaPropiedad").
        exists().not().isEmpty().isNumeric(),
    body("*.imei").
        optional().isNumeric(),
    body("*.idDenunciaCelularesMarca").
        exists().not().isEmpty().isNumeric(),
    body("*.modelo").
        optional(),   
    body("*.numero").
        optional().isNumeric(),
    body("*.empresa").
        optional(),
    body("*.otro").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports =  validateTelefonos