const { check, body } = require("express-validator")
const validateHelper = require('../../utils/validateHelper')

const validateCreateFamiliar = [
    body("idDenuncia").
        exists().
        not().isEmpty().
        isNumeric(),
    body("situacion1").
        optional().
        isNumeric({min:0,max:1}),
    body("situacion2").
        optional().
        isNumeric({min:0,max:1}),
    body("situacion3").
        optional().
        isNumeric({min:0,max:1}),
    body("situacion4").
        optional().
        isNumeric({min:0,max:1}),
    body("tipoViolencia1").
        optional().
        isNumeric({min:0,max:1}),
    body("tipoViolencia2").
        optional().
        isNumeric({min:0,max:1}),
    body("tipoViolencia3").
        optional().
        isNumeric({min:0,max:1}),
    body("tipoViolencia4").
        optional().
        isNumeric({min:0,max:1}),
    body("tipoViolencia5").
        optional().
        isNumeric({min:0,max:1}),
    body("tipoViolencia6").
        optional().
        isNumeric({min:0,max:1}),
    body("perfilAgresor1").
        optional().
        isNumeric({min:0,max:1}),
    body("perfilAgresor2").
        optional().
        isNumeric({min:0,max:1}),
    body("perfilAgresor3").
        optional().
        isNumeric({min:0,max:1}),
    body("perfilAgresor4").
        optional().
        isNumeric({min:0,max:1}),
    body("perfilAgresor5").
        optional().
        isNumeric({min:0,max:1}),
    body("perfilAgresor6").
        optional().
        isNumeric({min:0,max:1}),
    body("victima1").
        optional().
        isNumeric({min:0,max:1}),
    body("victima2").
        optional().
        isNumeric({min:0,max:1}),
    body("victima3").
        optional().
        isNumeric({min:0,max:1}),
    body("victima4").
        optional().
        isNumeric({min:0,max:1}),
    body("victima5").
        optional().
        isNumeric({min:0,max:1}),
    body("victima6").
        optional().
        isNumeric({min:0,max:1}),
    body("victima7").
        optional().
        isNumeric({min:0,max:1}),
    body("caracteristicas1").
        optional().
        isNumeric({min:0,max:1}),
    body("caracteristicas2").
        optional().
        isNumeric({min:0,max:1}),
    body("caracteristicas3").
        optional().
        isNumeric({min:0,max:1}),
    body("caracteristicas4").
        optional().
        isNumeric({min:0,max:1}),
    body("caracteristicas5").
        optional().
        isNumeric({min:0,max:1}),
    body("caracteristicas6").
        optional().
        isNumeric({min:0,max:1}),
    
    (req, res, next) => {
        validateHelper(req, res, next)
    }
]


module.exports = validateCreateFamiliar