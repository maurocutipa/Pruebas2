const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateUpdateGenero = [
    check("id").exists().not().isEmpty().isNumeric(),

    body("situacion1").
        optional().isBoolean(),
    body("situacion2").
        optional().isBoolean(),
    body("tipoViolencia1").
        optional().isBoolean(),
    body("tipoViolencia2").
        optional().isBoolean(),
    body("tipoViolencia3").
        optional().isBoolean(),
    body("tipoViolencia4").
        optional().isBoolean(),
    body("tipoViolencia5").
        optional().isBoolean(),
    body("tipoViolencia6").
        optional().isBoolean(),
    body("tipoViolencia7").
        optional().isBoolean(),
    body("perfilAgresor1").
        optional().isBoolean(),
    body("perfilAgresor2").
        optional().isBoolean(),
    body("perfilAgresor3").
        optional().isBoolean(),
    body("perfilAgresor4").
        optional().isBoolean(),
    body("perfilAgresor5").
        optional().isBoolean(),
    body("perfilAgresor6").
        optional().isBoolean(),
    body("perfilAgresor7").
        optional().isBoolean(),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]


module.exports = validateUpdateGenero