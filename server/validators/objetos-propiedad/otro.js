const { body } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateOtro = [
    body().exists().not().isEmpty().isArray(),
    body("*.idDenunciaPropiedad").
        exists().not().isEmpty().isNumeric(),
    body("*.tipo").
        optional(),   
    body("*.observaciones").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateOtro