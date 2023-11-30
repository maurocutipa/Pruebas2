const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateUpdateFamiliar = [

    body("situacion1").
        optional().
        isBoolean(),
    body("situacion2").
        optional().
        isBoolean(),
    body("situacion3").
        optional().
        isBoolean(),
    body("situacion4").
        optional().
        isBoolean(),
    body("tipoViolencia1").
        optional().
        isBoolean(),
    body("tipoViolencia2").
        optional().
        isBoolean(),
    body("tipoViolencia3").
        optional().
        isBoolean(),
    body("tipoViolencia4").
        optional().
        isBoolean(),
    body("tipoViolencia5").
        optional().
        isBoolean(),
    body("tipoViolencia6").
        optional().
        isBoolean(),
    body("perfilAgresor1").
        optional().
        isBoolean(),
    body("perfilAgresor2").
        optional().
        isBoolean(),
    body("perfilAgresor3").
        optional().
        isBoolean(),
    body("perfilAgresor4").
        optional().
        isBoolean(),
    body("perfilAgresor5").
        optional().
        isBoolean(),
    body("perfilAgresor6").
        optional().
        isBoolean(),
    body("victima1").
        optional().
        isBoolean(),
    body("victima2").
        optional().
        isBoolean(),
    body("victima3").
        optional().
        isBoolean(),
    body("victima4").
        optional().
        isBoolean(),
    body("victima5").
        optional().
        isBoolean(),
    body("victima6").
        optional().
        isBoolean(),
    body("victima7").
        optional().
        isBoolean(),
    body("caracteristicas1").
        optional().
        isBoolean(),
    body("caracteristicas2").
        optional().
        isBoolean(),
    body("caracteristicas3").
        optional().
        isBoolean(),
    body("caracteristicas4").
        optional().
        isBoolean(),
    body("caracteristicas5").
        optional().
        isBoolean(),
    body("caracteristicas6").
        optional().
        isBoolean(),
    
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]


module.exports = validateUpdateFamiliar