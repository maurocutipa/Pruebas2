const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateCreateGenero = [
    body("idDenuncia").
        exists().notEmpty().isNumeric(),
    body("situacion1").
        optional().isNumeric({min:0,max:1}),
    body("situacion2").
        optional().isNumeric({min:0,max:1}),
    body("tipoViolencia1").
        optional().isNumeric({min:0,max:1}),
    body("tipoViolencia2").
        optional().isNumeric({min:0,max:1}),
    body("tipoViolencia3").
        optional().isNumeric({min:0,max:1}),
    body("tipoViolencia4").
        optional().isNumeric({min:0,max:1}),
    body("tipoViolencia5").
        optional().isNumeric({min:0,max:1}),
    body("tipoViolencia6").
        optional().isNumeric({min:0,max:1}),
    body("tipoViolencia7").
        optional().isNumeric({min:0,max:1}),
    body("perfilAgresor1").
        optional().isNumeric({min:0,max:1}),
    body("perfilAgresor2").
        optional().isNumeric({min:0,max:1}),
    body("perfilAgresor3").
        optional().isNumeric({min:0,max:1}),
    body("perfilAgresor4").
        optional().isNumeric({min:0,max:1}),
    body("perfilAgresor5").
        optional().isNumeric({min:0,max:1}),
    body("perfilAgresor6").
        optional().isNumeric({min:0,max:1}),
    body("perfilAgresor7").
        optional().isNumeric({min:0,max:1}),
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]


module.exports = validateCreateGenero