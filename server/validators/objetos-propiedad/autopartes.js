const { body } = require("express-validator")
const validateHelper = require('@utils/validateHelper')

const validateAutopartes = [
    body().exists().not().isEmpty().isArray(),
    body("*.idDenunciaPropiedad").
        exists().not().isEmpty().isNumeric(),
    body("*.tipo").
        optional(),
    body("*.marca").
        optional(),   
    body("*.modelo").
        optional(),
    body("*.dominio").
        optional(),
    body("*.sustraido").
        optional(),
    body("*.danada").
        optional(),
    body("*.observaciones").
        optional(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]

module.exports = validateAutopartes